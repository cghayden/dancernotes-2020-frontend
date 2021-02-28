import { AboutUl } from './styles/AboutStyles'
import styled from 'styled-components'
import Card from './styles/Card'

const PageSignInStyle = styled.div`
  height: 50px;
  display: grid;
  place-items: center;
`
const AboutParent = ({ setView }) => {
  return (
    <Card>
      <h1>Dancernotes for Parents</h1>
      <div>
        <AboutUl>
          <li>
            All of your dancers' information, from all of their studios, in one
            place.
          </li>
          <li>
            Keep your own dance notes if your studio is not using Dancer Notes
            studio.
          </li>
          <li>Find studios, retailers, and opportunities for your dancers!</li>
        </AboutUl>
      </div>

      <div>
        <button
          type='button'
          className='btn-action-primary'
          onClick={() => setView('signupParent')}
        >
          Try Dancer Notes for Free
        </button>
        <PageSignInStyle>
          <button
            className='btn-action-primary-textOnly btn-small'
            onClick={() => setView('signin')}
          >
            Sign In To Your Dancer Notes
          </button>
        </PageSignInStyle>
      </div>
    </Card>
  )
}

export default AboutParent
