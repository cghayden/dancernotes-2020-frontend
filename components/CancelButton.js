import Router from 'next/router'

const CancelButton = () => {
  return (
    <button
      type='button'
      className='btn-action-secondary'
      onClick={() => Router.back()}
    >
      Cancel
    </button>
  )
}

export default CancelButton
