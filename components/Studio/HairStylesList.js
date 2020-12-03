import Link from 'next/link'

const HairStylesList = ({ hairStyles }) => {
  return (
    <ul>
      {hairStyles.map((hairStyle) => (
        <li key={hairStyle.id}>
          <Link href={`/studio/hairstyles/${hairStyle.id}`}>
            <a className='btn-selectionOption'>{hairStyle.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default HairStylesList
