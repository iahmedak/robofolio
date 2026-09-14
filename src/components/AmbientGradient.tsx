import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { prefersReduced } from "../lib/gsap";

export function AmbientGradient() {
  if (typeof window !== "undefined" && prefersReduced()) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <ShaderGradientCanvas
        pixelDensity={1}
        pointerEvents="none"
        lazyLoad
        fov={45}
      >
        <ShaderGradient
          control="props"
          type="plane"
          animate="on"
          uSpeed={0.35}
          uStrength={2.2}
          uDensity={1.1}
          uFrequency={4.5}
          color1="#E9EEFF"
          color2="#D3E0FF"
          color3="#B9CCFF"
          lightType="3d"
          brightness={1.15}
          grain="off"
          positionX={-1.2}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={10}
          rotationZ={45}
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.6}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
