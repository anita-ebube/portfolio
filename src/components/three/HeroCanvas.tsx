"use client";

import {
  Component,
  Suspense,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { HeroSculpture } from "@/components/three/HeroSculpture";
import { usePrefersReducedMotion } from "@/lib/motion";

interface HeroCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isActive?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function subscribeMobile(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(max-width: 1023px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1023px)").matches;
}

function getMobileServerSnapshot() {
  return false;
}

function SculptureFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center"
    >
      <div className="relative h-48 w-48 rounded-full border border-[rgba(243,242,238,0.16)] bg-[radial-gradient(circle_at_35%_35%,rgba(243,242,238,0.22),rgba(20,23,28,0.92)_55%,rgba(7,8,9,1)_100%)] shadow-[0_0_80px_rgba(200,255,0,0.12)] sm:h-64 sm:w-64">
        <div className="absolute inset-4 rounded-full border border-[rgba(200,255,0,0.38)]" />
        <div className="absolute inset-10 rounded-full border border-[rgba(243,242,238,0.12)]" />
      </div>
    </div>
  );
}

function canUseWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => {};

function getWebGLSnapshot(): boolean {
  return canUseWebGL();
}

function getClientTrue(): boolean {
  return true;
}

function getClientFalse(): boolean {
  return false;
}

export function HeroCanvas({
  scrollProgressRef,
  isActive = true,
}: HeroCanvasProps) {
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );
  const reducedMotion = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientTrue,
    getClientFalse,
  );
  const webglReady = useSyncExternalStore(
    emptySubscribe,
    getWebGLSnapshot,
    getClientFalse,
  );

  if (!mounted || !webglReady) {
    return <SculptureFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<SculptureFallback />}>
      <div
        className="relative h-full w-full select-none"
        aria-label="Interactive 3D metallic sculpture"
      >
        <Canvas
          frameloop={isActive ? "always" : "never"}
          dpr={isMobile ? [1, 1.25] : [1, 1.75]}
          camera={{
            position: isMobile ? [0, 0, 4.8] : [0, 0, 5.0],
            fov: isMobile ? 40 : 38,
            near: 0.1,
            far: 40,
          }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
          }}
        >
          <Suspense fallback={null}>
            {/* Cinematic Three-Point Lighting with Electric Lime Rim Accent */}
            <ambientLight intensity={0.35} color="#e8eaee" />
            <spotLight
              position={[-3.8, 5.0, 4.2]}
              angle={0.48}
              penumbra={0.9}
              intensity={38}
              color="#ffffff"
            />
            <pointLight
              position={[3.5, -1.8, 2.2]}
              intensity={18}
              distance={12}
              color="#c8ff00"
            />
            <pointLight
              position={[-3.0, -2.5, -2.0]}
              intensity={8}
              distance={10}
              color="#8fa4be"
            />

            {/* Procedural Reflection Studio for High-Contrast Liquid Chrome */}
            <Environment resolution={isMobile ? 64 : 128} frames={1}>
              <color attach="background" args={["#070809"]} />
              {/* Primary Overhead Diffused Softbox */}
              <Lightformer
                form="rect"
                intensity={3.8}
                color="#ffffff"
                scale={[10, 2.8, 1]}
                position={[0, 5.5, 1.5]}
                rotation={[Math.PI / 2, 0, 0]}
              />
              {/* Left High-Key Specular Accent Bar */}
              <Lightformer
                form="rect"
                intensity={4.2}
                color="#ffffff"
                scale={[2.2, 9, 1]}
                position={[-6, 1.5, 2]}
                rotation={[0, Math.PI / 2.2, 0]}
              />
              {/* Electric Lime Specular Reflection Strip */}
              <Lightformer
                form="rect"
                intensity={2.6}
                color="#c8ff00"
                scale={[1.6, 7.5, 1]}
                position={[5.5, -0.5, -1.5]}
                rotation={[0, -Math.PI / 2, 0]}
              />
              {/* Cool Horizon Ambient Ring */}
              <Lightformer
                form="ring"
                intensity={1.4}
                color="#8ba0b6"
                scale={[7, 7, 1]}
                position={[0, -4.5, -3]}
                rotation={[-Math.PI / 2, 0, 0]}
              />
            </Environment>

            <HeroSculpture
              scrollProgressRef={scrollProgressRef}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
              isActive={isActive}
            />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
