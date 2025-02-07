import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

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
// \[ r_2(\theta) = 2 + \frac{|\cos(3\theta)| + 2\left(0.25 - \left|\cos\left(3\theta + \frac{\pi}{2}\right)\right|\right)}{2 + 8\left|\cos\left(6\theta + \frac{\pi}{2}\right)\right|} \]
// ___

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

// \[ r_2(\theta) = 2 + \frac{|\cos(3\theta)| + 2\left(0.25 - \left|\cos\left(3\theta + \frac{\pi}{2}\right)\right|\right)}{2 + 8\left|\cos\left(6\theta + \frac{\pi}{2}\right)\right|} \]
export default function R2ThetaVisualization() {
  return (
    <Canvas className={'grow'}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Lotus3D color={'green'} />
      <OrbitControls />
    </Canvas>
  );
}
