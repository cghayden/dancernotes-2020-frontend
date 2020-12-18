export default function LockedSvg({ w = '20', h = '20' }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox='0 0 22 22'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='5' y='9' width='12' height='12' rx='2' ry='2'></rect>
      <path d='M7 9V7a4 4 0 0 1 8 0v3'></path>
      <line x1='11' y1='18' x2='11' y2='15'></line>
      <circle cx='11' cy='14' r='.5'></circle>{' '}
    </svg>
  )
}
