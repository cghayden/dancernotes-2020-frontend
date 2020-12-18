import Link from 'next/link'

const Dancers = ({ dancers }) => {
  return (
    <ul>
      {dancers.map((dancer) => (
        <li key={dancer.id}>
          <Link href={`/studio/dancers/${dancer.id}`}>
            <a className='btn-selectionOption'>
              {dancer.firstName} {dancer.lastName}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Dancers
