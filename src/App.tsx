import clsx from 'clsx';
import { useEffect, useState } from 'react';

import R2ThetaVisualization from './R2ThetaVisualization.tsx';
import { LotusSvg, calcInnerWave, calcOuterWave, polarToCartesian } from './lotus-svg.tsx';

function SideBar() {
  return (
    <aside className={clsx('bg-blue-950 block p-4', 'z-40  transition-all')} aria-label='Sidebar'>
      Configurator
    </aside>
  );
}

// function Lotus() {
//   const [points, setPoints] = useState<THREE.Vector3[]>([]);
//
//   useEffect(() => {
//     for (let i = 0; i <= numPoints; i++) {
//       const theta = (i / numPoints) * 2 * Math.PI;
//
//       const outerWave = Math.abs(Math.cos(6 * petalFrequency * theta + Math.PI / 2));
//       const innerWave = Math.abs(Math.cos(3 * petalFrequency * theta + Math.PI / 2));
//
//       const a = Math.abs(Math.cos(3 * petalFrequency * theta));
//       const b = 2 * (0.9 - innerWave);
//       let r = 3 + a + b / (2 + 8 * outerWave);
//
//       // Apply squash factor
//       r = 3 + (r - 3) * squashFactor;
//
//       // Convert polar to Cartesian coordinates
//       const x = r * rScale * Math.cos(theta);
//       const y = r * rScale * Math.sin(theta);
//       setPoints((prev) => [...prev, new THREE.Vector3(x, y, 0)]);
//     }
//   }, []);
//   console.log(points);
//   return (
//     <>
//       <Line points={points} color='white' lineWidth={1} />
//
//       {/*<Sphere />*/}
//     </>
//   );
// }

function FlowerSvg() {
  const [data, setPathData] = useState<string[]>([]);
  useEffect(() => {
    const rScale = 40; // Scale factor for r

    const numPoints = 360; // Number of points to plot

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * 2 * Math.PI; // θ from 0 to 2π
      // let m = 3 + 2 + 8 * Math.abs(Math.cos(6 * theta + Math.PI / 2)) * Math.abs(Math.cos(3 * theta)) + 2 * (0.25 - Math.abs(Math.cos(3 * theta + Math.PI / 2)));

      const outerWave = calcOuterWave(theta);
      const innerWave = calcInnerWave(theta);

      const a = Math.abs(Math.cos(3 * theta));
      const b = 2 * (0.25 - innerWave);
      const r = 3 + a + b / (2 + 8 * outerWave);
      // const r = 5 + 3 * Math.cos(6 * theta);

      const { x, y } = polarToCartesian(r * rScale, theta);

      setPathData((prev) => [...prev, `${i === 0 ? 'M' : 'L'} ${x} ${y}`]);
    }
  }, []);
  return (
    <svg width='500' height='500' viewBox='-250 -250 500 500'>
      <path d={data.join(' ')} fill='none' stroke='#FF2E98' stroke-width='2' />
    </svg>
  );
}

function App() {
  return (
    <>
      <section
        className={clsx(
          'bg-black text-white',
          'min-h-screen',
          'flex flex-col md:flex-row items-stretch'
        )}
      >
        <main className={'bg-[#101010] flex flex-grow'}>
          <LotusSvg />

          {/*<Canvas className={'grow'}>*/}
          {/*  <Bounds fit={true}>*/}
          {/*    <Lotus />*/}
          {/*  </Bounds>*/}
          {/*  /!*<OrbitControls />*!/*/}
          {/*</Canvas>*/}
        </main>
        <SideBar />
      </section>
      <section className={'bg-black h-screen grid place-content-center'}>
        <FlowerSvg />
      </section>
      <section className={'bg-black h-screen flex'}>
        <R2ThetaVisualization />
      </section>
    </>
  );
}

export default App;
