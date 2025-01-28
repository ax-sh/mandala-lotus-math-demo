import { CubicBezierLine, Line, OrbitControls, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

function LotusFlower() {
  const params = useControls({
    petals: { value: 8, min: 4, max: 24, step: 1 },
    taper: { value: 1.5, min: 0.5, max: 3, step: 0.1 },
    curvature: { value: 0.25, min: 0, max: 1, step: 0.01 },
    scale: { value: 1, min: 0.5, max: 3, step: 0.1 },
    detail: { value: 500, min: 100, max: 1000, step: 50 },
  });

  // Compute line points with a closed loop
  const points = useMemo(() => {
    const theta = Array.from(
      { length: params.detail },
      (_, i) => (i / params.detail) * Math.PI * 2
    );

    const computedPoints = theta.map((t) => {
      const innerWave = Math.abs(Math.cos(params.petals * t + Math.PI / 2));
      const outerWave = Math.abs(Math.cos(6 * t + Math.PI / 2));

      const numerator = Math.abs(Math.cos(params.petals * t)) + 2 * (params.curvature - innerWave);
      const denominator = 2 + params.taper * outerWave;
      const r = 3 + numerator / denominator;

      // Calculate coordinates
      const x = Math.cos(t) * r * params.scale;
      const y = Math.sin(t) * r * params.scale;
      const z = 0; //Math.sin(t * params.petals) * 0.2;

      return new THREE.Vector3(x, y, z);
    });

    // Close the loop by adding the first point at the end
    computedPoints.push(computedPoints[0]);

    return computedPoints;
  }, [params]);

  return (
    <Line
      points={points} // Array of Vector3 points
      color='#FFA500'
      lineWidth={2} // Adjust line width
      dashed={false} // Set to true for dashed lines
    />
  );
}

function SmoothCurveLine() {
  const params = useControls({
    petals: { value: 8, min: 4, max: 24, step: 1 },
    taper: { value: 1.5, min: 0.5, max: 3, step: 0.1 },
    curvature: { value: 0.25, min: 0, max: 1, step: 0.01 },
    scale: { value: 1, min: 0.5, max: 3, step: 0.1 },
    detail: { value: 500, min: 100, max: 1000, step: 50 },
  });

  // Compute points for the curve
  const curvePoints = useMemo(() => {
    const theta = Array.from(
      { length: params.detail },
      (_, i) => (i / params.detail) * Math.PI * 2
    );

    const points = theta.map((t) => {
      const innerWave = Math.abs(Math.cos(params.petals * t + Math.PI / 2));
      const outerWave = Math.abs(Math.cos(6 * t + Math.PI / 2));

      const numerator = Math.abs(Math.cos(params.petals * t)) + 2 * (params.curvature - innerWave);
      const denominator = 2 + params.taper * outerWave;
      const r = 3 + numerator / denominator;

      const x = Math.cos(t) * r * params.scale;
      const y = Math.sin(t) * r * params.scale;
      const z = Math.sin(t * params.petals) * 0.2;

      return new THREE.Vector3(x, y, z);
    });

    // Close the loop by adding the first point to the end
    points.push(points[0]);

    // Create a CatmullRomCurve3 for smooth interpolation
    const curve = new THREE.CatmullRomCurve3(points, true); // `true` ensures a closed loop
    return curve.getPoints(params.detail * 10); // Interpolate for even smoother curves
  }, [params]);

  return (
    <Line
      points={curvePoints} // Array of interpolated Vector3 points
      color='orange'
      lineWidth={2}
      dashed={false}
    />
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: '#1a1a1a' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {/*<Sphere />*/}
      {/*<LotusFlower />*/}
      <SmoothCurveLine />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </Canvas>
  );
}

export default function LotusApp() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      dd
      <Scene />
    </div>
  );
}
