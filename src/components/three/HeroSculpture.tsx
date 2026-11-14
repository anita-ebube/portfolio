"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface HeroSculptureProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isMobile: boolean;
  reducedMotion: boolean;
  isActive?: boolean;
}

/**
 * Generates a closed, seam-free twisted harmonic ribbon manifold using
 * parallel-transport (Bishop) framing so liquid-chrome reflections flow
 * continuously without twist artifacts.
 *
 * Preserved original sculpture geometry with balanced scale for intentional focal framing.
 */
function createSculptedRibbonGeometry(uSteps: number, vSteps: number) {
  const curvePoint = (u: number, target: THREE.Vector3) => {
    const x = Math.sin(u) + 0.56 * Math.sin(2 * u);
    const y = Math.cos(u) - 0.42 * Math.cos(2 * u) + 0.16 * Math.sin(3 * u);
    const z = 0.58 * Math.sin(3 * u) + 0.2 * Math.cos(u);
    return target.set(x * 0.72, y * 0.72, z * 0.72);
  };

  // Sample centers & tangents
  const centers: THREE.Vector3[] = [];
  const tangents: THREE.Vector3[] = [];
  const pPrev = new THREE.Vector3();
  const pNext = new THREE.Vector3();
  const eps = 0.001;

  for (let i = 0; i <= uSteps; i++) {
    const u = (i / uSteps) * Math.PI * 2;
    const center = curvePoint(u, new THREE.Vector3());
    centers.push(center);

    curvePoint(u - eps, pPrev);
    curvePoint(u + eps, pNext);
    const tangent = pNext.clone().sub(pPrev).normalize();
    tangents.push(tangent);
  }

  // Build parallel-transport frame along the closed loop
  const normals: THREE.Vector3[] = [];
  const binormals: THREE.Vector3[] = [];

  const initialUp = new THREE.Vector3(0, 1, 0);
  if (Math.abs(tangents[0].dot(initialUp)) > 0.92) {
    initialUp.set(1, 0, 0);
  }
  const n0 = new THREE.Vector3()
    .crossVectors(tangents[0], initialUp)
    .normalize();
  const b0 = new THREE.Vector3()
    .crossVectors(tangents[0], n0)
    .normalize();

  normals.push(n0);
  binormals.push(b0);

  const rotAxis = new THREE.Vector3();
  const rotQuat = new THREE.Quaternion();

  for (let i = 1; i <= uSteps; i++) {
    const prevT = tangents[i - 1];
    const currT = tangents[i];
    const prevN = normals[i - 1];

    rotAxis.crossVectors(prevT, currT);
    const axisLen = rotAxis.length();
    const currN = prevN.clone();
    if (axisLen > 1e-6) {
      rotAxis.divideScalar(axisLen);
      const angle = Math.acos(THREE.MathUtils.clamp(prevT.dot(currT), -1, 1));
      rotQuat.setFromAxisAngle(rotAxis, angle);
      currN.applyQuaternion(rotQuat);
    }
    // Re-orthonormalize against current tangent
    currN.sub(currT.clone().multiplyScalar(currN.dot(currT))).normalize();
    const currB = new THREE.Vector3().crossVectors(currT, currN).normalize();
    normals.push(currN);
    binormals.push(currB);
  }

  // Distribute any closed-loop Bishop holonomy mismatch evenly so u=0 and u=2pi match
  const endN = normals[uSteps];
  const cosDiff = THREE.MathUtils.clamp(endN.dot(normals[0]), -1, 1);
  const sinDiff = endN.dot(binormals[0]);
  const closureError = Math.atan2(sinDiff, cosDiff);

  const vertexCount = (uSteps + 1) * (vSteps + 1);
  const positions = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices: number[] = [];

  const tmpPos = new THREE.Vector3();
  const frameN = new THREE.Vector3();
  const frameB = new THREE.Vector3();

  for (let i = 0; i <= uSteps; i++) {
    const tFrac = i / uSteps;
    const u = tFrac * Math.PI * 2;

    // 2 full twists around the closed loop + holonomy correction = seamless join
    const twist = 2 * u - closureError * tFrac;
    const cosT = Math.cos(twist);
    const sinT = Math.sin(twist);

    frameN
      .copy(normals[i])
      .multiplyScalar(cosT)
      .addScaledVector(binormals[i], sinT);
    frameB
      .copy(normals[i])
      .multiplyScalar(-sinT)
      .addScaledVector(binormals[i], cosT);

    // Sculpted ribbon cross-section modulation
    const majorRadius = 0.235 + 0.065 * Math.cos(3 * u);
    const minorRadius = 0.072 + 0.02 * Math.sin(2 * u);

    for (let j = 0; j <= vSteps; j++) {
      const vFrac = j / vSteps;
      const v = vFrac * Math.PI * 2;
      const idx = i * (vSteps + 1) + j;

      // Subtle architectural pinch on the ribbon edges
      const cosV = Math.cos(v);
      const sinV = Math.sin(v);
      const localX = majorRadius * cosV;
      const localY = minorRadius * sinV * (0.88 + 0.12 * Math.cos(2 * v));

      tmpPos
        .copy(centers[i])
        .addScaledVector(frameN, localX)
        .addScaledVector(frameB, localY);

      positions[idx * 3] = tmpPos.x;
      positions[idx * 3 + 1] = tmpPos.y;
      positions[idx * 3 + 2] = tmpPos.z;

      uvs[idx * 2] = tFrac;
      uvs[idx * 2 + 1] = vFrac;
    }
  }

  for (let i = 0; i < uSteps; i++) {
    for (let j = 0; j < vSteps; j++) {
      const a = i * (vSteps + 1) + j;
      const b = (i + 1) * (vSteps + 1) + j;
      const c = (i + 1) * (vSteps + 1) + (j + 1);
      const d = i * (vSteps + 1) + (j + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  // Average normals across the u=0 / u=2pi seam for invisible reflection wrap
  const normalAttr = geometry.getAttribute("normal") as THREE.BufferAttribute;
  const nA = new THREE.Vector3();
  const nB = new THREE.Vector3();
  for (let j = 0; j <= vSteps; j++) {
    const startIdx = j;
    const endIdx = uSteps * (vSteps + 1) + j;
    nA.fromBufferAttribute(normalAttr, startIdx);
    nB.fromBufferAttribute(normalAttr, endIdx);
    nA.add(nB).normalize();
    normalAttr.setXYZ(startIdx, nA.x, nA.y, nA.z);
    normalAttr.setXYZ(endIdx, nA.x, nA.y, nA.z);
  }
  normalAttr.needsUpdate = true;

  return geometry;
}

export function HeroSculpture({
  scrollProgressRef,
  isMobile,
  reducedMotion,
  isActive = true,
}: HeroSculptureProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const coreRibbonRef = useRef<THREE.Mesh>(null);
  const telemetryRingRef = useRef<THREE.Group>(null);
  const entranceProgressRef = useRef(reducedMotion ? 1 : 0);
  const windowPointerRef = useRef({ x: 0, y: 0 });

  const { pointer } = useThree();

  useEffect(() => {
    if (reducedMotion || isMobile || !isActive) return;

    const handlePointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = -((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
      windowPointerRef.current.x = nx;
      windowPointerRef.current.y = ny;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, isMobile, isActive]);

  const ribbonGeometry = useMemo(
    () => createSculptedRibbonGeometry(isMobile ? 140 : 220, isMobile ? 22 : 32),
    [isMobile],
  );

  useEffect(() => {
    return () => {
      ribbonGeometry.dispose();
    };
  }, [ribbonGeometry]);

  useFrame((state, delta) => {
    const root = rootGroupRef.current;
    if (!root) return;

    const clampedDelta = Math.min(delta, 0.05);
    const elapsed = state.clock.elapsedTime;
    const scrollP = scrollProgressRef.current;

    // Smooth scale-in entrance on mount
    if (entranceProgressRef.current < 1) {
      entranceProgressRef.current = THREE.MathUtils.damp(
        entranceProgressRef.current,
        1,
        2.8,
        clampedDelta,
      );
      if (entranceProgressRef.current > 0.999) {
        entranceProgressRef.current = 1;
      }
    }

    // Refined scale: well-contained within the viewport camera frustum to eliminate any clipping
    const baseScale = isMobile ? 0.92 : 1.05;
    const currentScale = THREE.MathUtils.lerp(
      baseScale * 0.88,
      baseScale,
      entranceProgressRef.current,
    );
    root.scale.setScalar(currentScale);

    if (reducedMotion) {
      root.rotation.set(0.16, -0.42 + scrollP * 0.35, 0.04);
      return;
    }

    // Subtle damped mouse parallax + organic autonomous drift + scroll-driven yaw
    const activePointerX =
      Math.abs(pointer.x) > 0.001 ? pointer.x : windowPointerRef.current.x;
    const activePointerY =
      Math.abs(pointer.y) > 0.001 ? pointer.y : windowPointerRef.current.y;

    const targetRotX = -activePointerY * 0.2 + 0.12 + scrollP * 0.25;
    const targetRotY = activePointerX * 0.28 + elapsed * 0.11 + scrollP * 0.75;
    const targetRotZ =
      activePointerX * -0.06 + Math.sin(elapsed * 0.4) * 0.035;

    root.rotation.x = THREE.MathUtils.damp(
      root.rotation.x,
      targetRotX,
      3.8,
      clampedDelta,
    );
    root.rotation.y = THREE.MathUtils.damp(
      root.rotation.y,
      targetRotY,
      3.8,
      clampedDelta,
    );
    root.rotation.z = THREE.MathUtils.damp(
      root.rotation.z,
      targetRotZ,
      3.8,
      clampedDelta,
    );

    // Gentle vertical breathing
    const floatY = Math.sin(elapsed * 0.8) * 0.06 - scrollP * 0.18;
    root.position.y = THREE.MathUtils.damp(
      root.position.y,
      floatY,
      4.0,
      clampedDelta,
    );

    // Subtle harmonic rotation on the core ribbon and the single telemetry ring
    if (coreRibbonRef.current) {
      coreRibbonRef.current.rotation.z = Math.sin(elapsed * 0.25) * 0.12;
    }
    if (telemetryRingRef.current) {
      telemetryRingRef.current.rotation.z = elapsed * 0.14;
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Primary Liquid-Chrome Parametric Manifold — The Visual Focal Point */}
      <mesh ref={coreRibbonRef} geometry={ribbonGeometry}>
        <meshPhysicalMaterial
          color="#f0f3f8"
          metalness={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.03}
          reflectivity={1}
          iridescence={0.32}
          iridescenceIOR={1.42}
          envMapIntensity={2.1}
        />
      </mesh>

      {/* Refined Smoked Titanium Core Polyhedron (depth anchor without visual noise) */}
      <mesh rotation={[0.42, 0.65, 0.18]}>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshPhysicalMaterial
          color="#1e222a"
          metalness={0.98}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Single Delicate Precision Telemetry Ring (intentionally framing the focal sculpture) */}
      <group ref={telemetryRingRef} rotation={[0.44, -0.38, 0.12]}>
        {/* Subtle Meridian Orbit */}
        <mesh>
          <torusGeometry args={[1.52, 0.0035, 12, isMobile ? 64 : 100]} />
          <meshStandardMaterial
            color="#8a95a4"
            metalness={0.92}
            roughness={0.2}
            envMapIntensity={1.3}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Electric Lime Telemetry Arc Accent */}
        <mesh>
          <torusGeometry
            args={[1.52, 0.0055, 12, isMobile ? 32 : 54, Math.PI * 0.44]}
          />
          <meshStandardMaterial
            color="#c8ff00"
            emissive="#c8ff00"
            emissiveIntensity={1.8}
            toneMapped={false}
          />
        </mesh>

        {/* Precision Telemetry Node */}
        <mesh position={[1.52, 0, 0]}>
          <sphereGeometry args={[0.024, 14, 14]} />
          <meshStandardMaterial
            color="#c8ff00"
            emissive="#c8ff00"
            emissiveIntensity={2.4}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
