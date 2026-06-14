export default function Grain() {
  return (
    <svg className="grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id="grain-n">
        <feTurbulence baseFrequency=".75" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-n)" />
    </svg>
  );
}
