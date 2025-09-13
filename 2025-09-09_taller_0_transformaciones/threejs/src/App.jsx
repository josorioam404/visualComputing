import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef();
  const clock = new THREE.Clock();

  useFrame(() => {
    const t = clock.getElapsedTime();

    // Movimiento circular
    const radius = 2;
    // Ajuste en posiciones x y z para ecuación paramétrica del circulo
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;

    // Rotación sobre su eje
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;

    // Escalado suave con sin()
    const scale = 1 + 0.3 * Math.sin(t * 2);
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="crimson" />
    </mesh>
  );
}

// App con OrbitControls
function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <AnimatedSphere />
      <OrbitControls />
    </Canvas>
  );
}

export default App;

