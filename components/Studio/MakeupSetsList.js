import Link from 'next/link'

const MakeupSetsList = ({ makeupSets }) => {
  return (
    <ul>
      {makeupSets.map((makeupSet) => (
        <li key={makeupSet.id}>
          <Link href={`/studio/makeup/${makeupSet.id}`}>
            <a className='btn-selectionOption'>{makeupSet.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default MakeupSetsList
