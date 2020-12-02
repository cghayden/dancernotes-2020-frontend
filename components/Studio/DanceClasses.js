import { useContext } from 'react'
import { FilterContext } from './FilterContext'
import Link from 'next/link'

const DanceClasses = ({ allStudioDanceClasses }) => {
  const { filter } = useContext(FilterContext)

  function compareDanceToFilter(danceClass, filter) {
    let pass = true
    const filterCategories = Object.keys(filter)
    filterCategories.forEach((category) => {
      if (!filter[category].includes(danceClass[category])) {
        pass = false
      }
    })
    return pass
  }

  const filteredClasses = allStudioDanceClasses.filter((danceClass) =>
    compareDanceToFilter(danceClass, filter)
  )

  return (
    <ul>
      {filteredClasses.map((danceClass) => (
        <li key={danceClass.id}>
          <Link href={`/studio/classes/${danceClass.id}`}>
            <a className='btn-selectionOption'>{danceClass.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default DanceClasses
