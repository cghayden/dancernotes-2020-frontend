import Link from 'next/link'

const CancelButton = () => {
  return (
    <Link href='/parent/'>
      <a className='btn-action-secondary'>Cancel</a>
    </Link>
  )
}

export default CancelButton
