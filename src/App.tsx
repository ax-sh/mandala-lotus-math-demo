import clsx from 'clsx';

import { LotusSvg } from './lotus-svg.tsx';

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

function App() {
  return (
    <section
      className={clsx(
        'bg-black text-white',
        'min-h-screen',
        'flex flex-col md:flex-row items-stretch'
      )}
    >
      <main className={'bg-[#333] flex flex-grow'}>
        <LotusSvg />
        {/*<div className={'grid place-content-center row-span-1 col-span-1 '}>*/}
        {/*  <LotusSvg />*/}
        {/*  <LotusSvg />*/}
        {/*</div>*/}
        {/*<Canvas className={'grow'}>*/}
        {/*  <Bounds fit={true}>*/}
        {/*    <Lotus />*/}
        {/*  </Bounds>*/}
        {/*  /!*<OrbitControls />*!/*/}
        {/*</Canvas>*/}
      </main>
      <SideBar />
    </section>
  );
}

export default App;
