import Link from 'next/link'

const DancersNav = ({ dancers }) => {
  return (
    <ul>
      {dancers.map((dancer) => (
        <li key={dancer.id}>
          <Link href={`/parent/dancers/${dancer.id}`}>
            <a className='btn-selectionOption'>{dancer.firstName}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default DancersNav
