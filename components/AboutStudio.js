import styled from 'styled-components'
import { AboutUl } from './styles/AboutStyles'
import Card from './styles/Card'
const PageSignInStyle = styled.div`
  height: 50px;
  display: grid;
  place-items: center;
`
const AboutStudio = ({ setView }) => {
  return (
    <Card>
      <h1>Dancernotes for Studios</h1>
      <div>
        <AboutUl>
          <li>All of your dance and costume information in one place</li>
          <li>
            Keep parents and retailers up to date on all apparel requirements
          </li>
          <li>A single location for all parent communications</li>
        </AboutUl>
      </div>
      <div>
        <div>
          <button
            type='button'
            className='btn-action-primary'
            onClick={() => setView('signupStudio')}
          >
            Try Dancer Notes for Free
          </button>
          <PageSignInStyle>
            <button
              className='btn-action-primary-textOnly btn-small'
              onClick={() => setView('signin')}
            >
              Sign In To Your Studio Dancer Notes
            </button>
          </PageSignInStyle>
        </div>
      </div>
    </Card>
  )
}

export default AboutStudio
