import { Bounds, Line, LineProps, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { ComponentRef, useMemo, useRef } from 'react';
import * as THREE from 'three';

// \[ r_2(\theta) = 2 + \frac{|\cos(3\theta)| + 2\left(0.25 - \left|\cos\left(3\theta + \frac{\pi}{2}\right)\right|\right)}{2 + 8\left|\cos\left(6\theta + \frac{\pi}{2}\right)\right|} \]
// ___

function usePoints() {
  return useMemo(() => {
    const numPoints = 1000;
    const positions = [];

    for (let i = 0; i < numPoints; i++) {
      const theta = (i / numPoints) * 2 * Math.PI;
      const r =
        2 +
        (Math.abs(Math.cos(3 * theta)) + 2 * (0.25 - Math.abs(Math.cos(3 * theta + Math.PI / 2)))) /
          (2 + 8 * Math.abs(Math.cos(6 * theta + Math.PI / 2)));

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      positions.push(x, y, 0);
    }

    return new Float32Array(positions);
  }, []);
}

type Lotus3DProps = { color: string };
export function Lotus3D({ color }: Lotus3DProps) {
  const points = usePoints();
  const ref = useRef(null);
  console.log(ref);
  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} />
    </line>
  );
}
function absCos(value: number) {
  const cos3Theta = Math.cos(value);
  return Math.abs(cos3Theta);
}

function Lotus3DLine({ color }: { color: string }) {
  const ref = useRef<ComponentRef<typeof Line>>(null);
  const { baseRadius } = useControls({ baseRadius: { value: 9, step: 1, min: 1 } });

  const lines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 360;

    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * 2 * Math.PI;

      // 2. Calculate the Numerator
      const absCos3Theta = absCos(3 * theta);
      const absCosShiftedTheta = absCos(3 * theta + Math.PI / 2);
      const numerator = absCos3Theta + 2 * (0.25 - absCosShiftedTheta);

      // Calculate the Denominator
      const absCos6ThetaShifted = absCos(6 * theta + Math.PI / 2);
      const denominator = 2 + 8 * absCos6ThetaShifted;

      //
      const r = baseRadius + numerator / denominator;

      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);

      points.push(new THREE.Vector3(x, y, 0));
    }

    // Close the loop by duplicating the first point at the end
    points.push(points[0].clone());
    return points;
  }, [baseRadius]);
  useFrame(() => {
    const i = ref.current;
    if (!i) return;
    i.rotation.z += 0.01;
  });

  return <Line ref={ref} points={lines} color={color} lineWidth={2} />;
}

// \[ r_2(\theta) = 2 + \frac{|\cos(3\theta)| + 2\left(0.25 - \left|\cos\left(3\theta + \frac{\pi}{2}\right)\right|\right)}{2 + 8\left|\cos\left(6\theta + \frac{\pi}{2}\right)\right|} \]
export default function R2ThetaVisualization() {
  return (
    <Canvas className={'grow'}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/*<Lotus3D color={'green'} />*/}
      <Bounds fit={true}>
        <Lotus3DLine color={'green'} />
      </Bounds>
      <OrbitControls />
    </Canvas>
  );
}
