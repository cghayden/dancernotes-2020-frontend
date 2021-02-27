import { AboutUl } from './styles/AboutStyles'
import styled from 'styled-components'

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`
const PageSignInStyle = styled.div`
  height: 50px;
  display: grid;
  place-items: center;
`
const AboutParent = ({ setView }) => {
  return (
    <AboutContent>
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
    </AboutContent>
  )
}

export default AboutParent
