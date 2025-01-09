import { useControls } from 'leva';
import { useEffect, useState } from 'react';

export function polarToCartesian(r: number, theta: number) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  };
}

export function calcOuterWave(value: number) {
  return Math.abs(Math.cos(6 * value + Math.PI / 2));
}

export function calcInnerWave(value: number) {
  return Math.abs(Math.cos(3 * value + Math.PI / 2));
}
type NumberType<T extends string> = { [key in T]: number };
function calculatePoints({
  numPoints,
  petalFrequency,
  squashFactor,
  rScale,
  shape,
}: NumberType<'numPoints' | 'petalFrequency' | 'squashFactor' | 'rScale' | 'shape'>) {
  const pathData: string[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const theta = (i / numPoints) * 2 * Math.PI; // θ from 0 to 2π

    const outerWave = calcOuterWave(petalFrequency * theta);
    const innerWave = calcInnerWave(petalFrequency * theta);

    const a = Math.abs(Math.cos(3 * petalFrequency * theta));
    const b = 2 * (shape - innerWave);
    let r = 3 + a + b / (2 + 8 * outerWave);

    // Apply squash factor
    r = 3 + (r - 3) * squashFactor;

    const { x, y } = polarToCartesian(r * rScale, theta);

    // M = Move to the first point
    // L = Draw line to the next point
    pathData.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return pathData;
}
export function LotusSvg() {
  const [data, setData] = useState<string[]>([]);
  const { petalsMul, scale, shape } = useControls({
    petalsMul: { value: 1, step: 1, min: 1, max: 20 },
    scale: { value: 50, min: 50 },
    shape: { value: 0.9, min: 0, max: 2 },
  });
  useEffect(() => {
    const rScale = scale; // Scale factor for r

    const numPoints = 360; // Number of points to plot

    // Adjust these values to change the number and shape of petals
    const petalFrequency = petalsMul; // Increase this to add more petals
    const squashFactor = 1 / (petalsMul * 2); // Adjust this to squash (< 1) or stretch (> 1) the petals
    const pathData = calculatePoints({ rScale, numPoints, petalFrequency, squashFactor, shape });
    setData(pathData);
  }, [petalsMul, scale, shape]);
  return (
    <section className={'flex-grow grid place-content-center col-start-1 row-start-1'}>
      <svg width='500' height='500' viewBox='-250 -250 500 500'>
        <path d={data.join(' ')} fill='none' stroke='#FF2E98' stroke-width='2' />
      </svg>
    </section>
  );
}
