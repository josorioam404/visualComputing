import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function FloatingObjects() {
  const group = useRef();

  const earthRef = useRef();
  const mercuryRef = useRef();
  const venusRef = useRef();
  const marsRef = useRef();
  const jupiterRef = useRef();

  const boxTexture = useTexture("/textures/box.jpg");
  const earthTexture = useTexture("/textures/earth.jpg");
  const mercuryTexture = useTexture("/textures/mercury.jpg");
  const venusTexture = useTexture("/textures/venus.jpg");
  const marsTexture = useTexture("/textures/mars.jpg");
  const jupiterTexture = useTexture("/textures/jupiter.jpg");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (group.current) group.current.rotation.y = t * 0.15;

    // Órbitas
    if (earthRef.current) {
      earthRef.current.position.x = Math.sin(t * 1.0) * 5;
      earthRef.current.position.z = Math.cos(t * 1.0) * 5;
    }
    if (mercuryRef.current) {
      mercuryRef.current.position.x = Math.sin(t * 1.5) * 3;
      mercuryRef.current.position.z = Math.cos(t * 1.5) * 3;
    }
    if (venusRef.current) {
      venusRef.current.position.x = Math.sin(t * 1.2) * 4.5;
      venusRef.current.position.z = Math.cos(t * 1.2) * 4.5;
    }
    if (marsRef.current) {
      marsRef.current.position.x = Math.sin(t * 0.9) * 6.5;
      marsRef.current.position.z = Math.cos(t * 0.9) * 6.5;
    }
    if (jupiterRef.current) {
      jupiterRef.current.position.x = Math.sin(t * 0.6) * 8.5;
      jupiterRef.current.position.z = Math.cos(t * 0.6) * 8.5;
    }
  });

  // MONTAÑA DE CAJAS
  const boxes = [];
  const levels = 4;
  const width = 4;
  const depth = 3;

  for (let y = 0; y < levels; y++) {
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < depth; z++) {
        const offsetX = (Math.random() - 0.5) * 0.15;
        const offsetZ = (Math.random() - 0.5) * 0.15;

        boxes.push(
          <mesh
            key={`box-${x}-${y}-${z}`}
            position={[
              -2 + x * 1.05 + offsetX,
              y * 1.05,
              -1 + z * 1.05 + offsetZ,
            ]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={boxTexture} />
          </mesh>
        );
      }
    }
  }

  return (
    <group ref={group} position={[0, 1, 0]}>
      
      {/* MONTÓN DE CAJAS */}
      {boxes}

      {/* TOROIDE*/}
      <mesh position={[0, 4.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.5, 32, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* TIERRA ORBITANDO */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>

      {/* PLANETAS ORBITANDO */}
      <mesh ref={mercuryRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial map={mercuryTexture} />
      </mesh>

      <mesh ref={venusRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial map={venusTexture} />
      </mesh>

      <mesh ref={marsRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial map={marsTexture} />
      </mesh>

      <mesh ref={jupiterRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial map={jupiterTexture} />
      </mesh>

    </group>
  );
}




