import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

// INITIAL CONFIG FOR RENDERER
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

// CAMERA CONFIGURATION
// PERSPECTIVE CAMERA
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(5.37, -0.43, 7.56);
camera.rotation.set(0.0357, 0.3609, -0.0126);

// ORTOGRAPHIC CAMERA
const orthoSize = 10;
const orthoCamera = new THREE.OrthographicCamera(
  -orthoSize * aspect,
  orthoSize * aspect,
  orthoSize,
  -orthoSize,
  0.1,
  1000
);
orthoCamera.position.set(10, 10, 10);
orthoCamera.lookAt(3, 0, 1);

// CAMERA CHANGE
let activeCamera = camera;
let isPerspective = true;

// SCENE CREATION
const scene = new THREE.Scene();

// ORBIT CONTROLS WITH DAMPING FOR SMOOTHNESS
const controls = new OrbitControls(activeCamera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// AUTO-ROTATION CONFIGURATION
const initialCameraPos = new THREE.Vector3(5.37, -0.43, 7.56);
const centerPoint = new THREE.Vector3(3, 0, 1);
const initialRadius = Math.sqrt(
  Math.pow(initialCameraPos.x - centerPoint.x, 2) +
    Math.pow(initialCameraPos.z - centerPoint.z, 2)
);
const initialAngle = Math.atan2(
  initialCameraPos.z - centerPoint.z,
  initialCameraPos.x - centerPoint.x
);
let autoRotate = false;

// CROMATIC PALETTE
const colorPalette = {
  primary: { hex: 0xff6b35, hsv: [18, 79, 100], name: "Naranja cálido" },
  secondary: { hex: 0x004e89, hsv: [203, 100, 54], name: "Azul profundo" },
  accent: { hex: 0x4a7c59, hsv: [140, 38, 49], name: "Verde bosque" },
  neutral: { hex: 0x333333, hsv: [0, 0, 20], name: "Gris oscuro" },
  light: { hex: 0xffffff, hsv: [0, 0, 100], name: "Blanco" },
};

console.log(colorPalette);

// ILLUMINATION SYSTEM (KEY, FILL, RIM)
const keyLight = new THREE.DirectionalLight(0xfff4e6, 1.5);
keyLight.position.set(10, 15, 10);
keyLight.castShadow = true;
keyLight.shadow.mapSize.width = 2048;
keyLight.shadow.mapSize.height = 2048;
keyLight.shadow.camera.left = -20;
keyLight.shadow.camera.right = 20;
keyLight.shadow.camera.top = 20;
keyLight.shadow.camera.bottom = -20;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xa8d8ff, 0.6);
fillLight.position.set(-8, 10, -5);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
rimLight.position.set(0, 5, -10);
scene.add(rimLight);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// ILLUMINATION PRESETS
const textureLoader = new THREE.TextureLoader();
let currentPreset = "day";

function setLightingPreset(preset) {
  if (preset === "day") {
    keyLight.color.setHex(0xfff4e6);
    keyLight.intensity = 1.5;
    fillLight.color.setHex(0xa8d8ff);
    fillLight.intensity = 0.6;
    ambientLight.intensity = 0.5;
    textureLoader.load("assets/sky.jpeg", function (texture) {
      scene.background = texture;
    });
  } else if (preset === "sunset") {
    keyLight.color.setHex(0xff6b35);
    keyLight.intensity = 2.0;
    fillLight.color.setHex(0x7b2d8c);
    fillLight.intensity = 0.4;
    ambientLight.intensity = 0.3;
    textureLoader.load("assets/evening.jpg", function (texture) {
      scene.background = texture;
    });
  }
  currentPreset = preset;
  console.log("Preset de iluminación:", preset);
}

// SHADERS WITH PROCEDURAL TEXTURES
const checkerShader = {
  uniforms: {
    color1: { value: new THREE.Color(colorPalette.neutral.hex) },
    color2: { value: new THREE.Color(colorPalette.light.hex) },
    scale: { value: 10.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float scale;
    varying vec2 vUv;
    void main() {
      vec2 scaled = vUv * scale;
      float checker = mod(floor(scaled.x) + floor(scaled.y), 2.0);
      gl_FragColor = vec4(mix(color1, color2, checker), 1.0);
    }
  `,
};

const stripesShader = {
  uniforms: {
    color1: { value: new THREE.Color(colorPalette.primary.hex) },
    color2: { value: new THREE.Color(colorPalette.secondary.hex) },
    scale: { value: 15.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float scale;
    varying vec2 vUv;
    void main() {
      float stripes = mod(vUv.x * scale, 1.0);
      float pattern = step(0.5, stripes);
      gl_FragColor = vec4(mix(color1, color2, pattern), 1.0);
    }
  `,
};

// GLB MODELS
const loader = new GLTFLoader();
const models = {
  dino: null,
  dragon: null,
  meca: null,
  acropolis: null,
};
const originalMaterials = {};

let shadersEnabled = true;

function applyShaders() {
  for (const key in models) {
    const model = models[key];
    if (!model) continue;

    model.traverse((node) => {
      if (!node.isMesh) return;

      if (!originalMaterials[node.uuid]) {
        originalMaterials[node.uuid] = node.material;
      }

      if (shadersEnabled) {
        if (key === "dino") {
          node.material = new THREE.ShaderMaterial(checkerShader);
        } else if (key === "meca") {
          node.material = new THREE.ShaderMaterial(stripesShader);
        }
      } else {
        node.material = originalMaterials[node.uuid]; // restaurar material original
      }
    });
  }
}

// MODEL 1: THERIZINOSAURUS - ORGANIC
loader.load("assets/therizinosaurus.glb", (glb) => {
  models.dino = glb.scene;
  models.dino.scale.set(1, 1, 1);
  models.dino.position.set(0, -2.75, 0);
  models.dino.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  scene.add(models.dino);
  applyShaders();
  console.log("Modelo 1 cargado (con shader damero)");
});

// MODEL 2: DRAGON - ORGANIC
loader.load("assets/dragon.glb", (glb) => {
  models.dragon = glb.scene;
  models.dragon.scale.set(4, 4, 4);
  models.dragon.position.set(2.5, 6, -1);
  models.dragon.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  scene.add(models.dragon);
  console.log("Modelo 2 cargado (con animación restaurada)");
});

// MODEL 3: MECA JARLY - UTILITARY
loader.load("assets/mecaJarly.glb", (glb) => {
  models.meca = glb.scene;
  models.meca.scale.set(1, 1, 1);
  models.meca.position.set(6, -2.9, 0);
  models.meca.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  scene.add(models.meca);
  applyShaders();
  console.log("Modelo 3 cargado (con shader bandas)");
});

// MODEL 4: ACROPOLIS - ARCHITECTURAL
loader.load("assets/acropolis.glb", (glb) => {
  models.acropolis = glb.scene;
  models.acropolis.scale.set(8, 8, 8);
  models.acropolis.position.set(3, 0, 1);
  models.acropolis.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  scene.add(models.acropolis);
});

// FLOOR
const floorTexture = textureLoader.load("assets/grass.jpg");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);

const floorGeo = new THREE.PlaneGeometry(200, 200);
const floorMat = new THREE.MeshStandardMaterial({
  map: floorTexture,
  roughness: 0.85,
  metalness: 0.05,
});
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -3.9;
floor.receiveShadow = true;
scene.add(floor);

setLightingPreset("day");

// KEYBOARD CONTROLS
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    autoRotate = !autoRotate;
    controls.enabled = !autoRotate;
    console.log("Auto-rotación:", autoRotate ? "ON" : "OFF");
  }
  if (e.code === "KeyC") {
    isPerspective = !isPerspective;
    activeCamera = isPerspective ? camera : orthoCamera;
    controls.object = activeCamera;
    controls.update();
  }
  if (e.code === "KeyL") {
    setLightingPreset(currentPreset === "day" ? "sunset" : "day");
  }
  if (e.code === "KeyH") {
    shadersEnabled = !shadersEnabled;
    applyShaders();
    console.log("Shaders:", shadersEnabled ? "ACTIVADOS" : "DESACTIVADOS");
  }
});

// ANIMATION LOOP
function animate(t = 0) {
  requestAnimationFrame(animate);

  if (autoRotate && isPerspective) {
    const speed = 0.0003;
    const currentAngle = initialAngle + t * speed;
    camera.position.x =
      centerPoint.x + Math.cos(currentAngle) * initialRadius;
    camera.position.z =
      centerPoint.z + Math.sin(currentAngle) * initialRadius;
    camera.position.y = initialCameraPos.y;
    camera.lookAt(centerPoint);
  } else if (!autoRotate) {
    controls.update();
  }

  // DRAGON animation restored
  if (models.dragon) {
    models.dragon.rotation.y += 0.005;
    models.dragon.position.y = 3 + Math.sin(t * 0.002) * 0.3;
  }

  // Other model motions
  if (models.dino) models.dino.rotation.y = Math.sin(t * 0.0005) * 0.3;
  if (models.meca) models.meca.rotation.y = t * 0.0003;

  // Rim light rotation
  rimLight.position.x = Math.cos(t * 0.0003) * 15;
  rimLight.position.z = Math.sin(t * 0.0003) * 15;

  renderer.render(scene, activeCamera);
  // console.log(camera.position);
}
animate();
