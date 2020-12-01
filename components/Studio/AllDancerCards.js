import Link from 'next/link'

const Dancers = ({ dancers }) => {
  const filteredDancers = dancers.filter((dancer) => {
    console.log('run dancer through filter to see if they meet the criteria')
    return dancer.firstName.length > 1
  })

  return (
    <ul>
      {filteredDancers.map((dancer) => (
        <li key={dancer.id}>
          <Link href={`/studio/dancers/${dancer.id}`}>
            <a>
              {dancer.firstName} {dancer.lastName}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Dancers
