import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

function AnimatedBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "radial-gradient(circle at center, #0a192f 0%, #000814 100%)"
      }}
    >
      <Canvas>
        <Stars
          radius={100}
          depth={50}
          count={6000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  )
}

export default AnimatedBackground