import { AboutUl } from './styles/AboutStyles'

const AboutParent = ({ setActive }) => {
  return (
    <>
      <h1>Dancernotes for Parents</h1>
      <div>
        <AboutUl>
          <li>
            All of your dancers' information, from all of their studios, in one
            place
          </li>
          <li>
            Find studios, retailers,opportunities for your dancers, and more!
          </li>
        </AboutUl>
      </div>

      <div>
        <button
          type='button'
          className='btn-action-primary'
          onClick={() => setActive('signupParent')}
        >
          Try Dancer Notes for Free
        </button>
      </div>
    </>
  )
}

export default AboutParent
