const AboutStudio = ({ setView }) => {
  return (
    <>
      <h1>Dancernotes for Studios</h1>
      <ul>
        <li>All of your dance and costume information in one place</li>
        <li>
          Keep parents and retailers up to date on all apparel requirements
        </li>
        <li>A single location for all parent communications</li>
      </ul>
      <div>
        <button
          type='button'
          className='btn-action-primary'
          onClick={() => setView('signupStudio')}
        >
          Try Dancer Notes for Free
        </button>
      </div>
    </>
  )
}

export default AboutStudio
