import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Sparkles } from "@react-three/drei";
import FloatingObjects from "./FloatingObjects";
import { useEffect } from "react";
import { Leva, useControls } from "leva";

function CameraController() {
  const { camera } = useThree();

  // Panel de leva (automático)
  const { view } = useControls("Vistas", {
    view: {
      value: "Default",
      options: ["Default", "Superior"]
    }
  });

  useEffect(() => {
    if (view === "Default") {
      camera.position.set(6, 4, 8);
      camera.lookAt(0, 1, 0);
    }
    if (view === "Superior") {
      camera.position.set(0, 10, 0);
      camera.lookAt(0, 0, 0);
    }
  }, [view, camera]);

  return <OrbitControls />;
}

export default function Scene() {
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      {/* PANEL DE LEVA */}
      <Leva collapsed={false} /> 
      {/* puedes poner collapsed={true} para que salga minimizado */}

      <Canvas camera={{ position: [6, 4, 8], fov: 50 }}>
        <CameraController />

        {/* luces */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />

        {/* grid sci-fi */}
        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#4cc9f0"
          sectionSize={5}
          sectionColor="#4895ef"
          sectionThickness={1.2}
          fadeDistance={30}
          fadeStrength={1}
          infiniteGrid
        />

        {/* partículas */}
        <Sparkles count={150} scale={15} size={2} speed={0.4} color="white" />

        <FloatingObjects />
      </Canvas>
    </div>
  );
}





