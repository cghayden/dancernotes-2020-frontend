import styled from 'styled-components'

const LandingNavStyle = styled.nav`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: min-content 1fr max-content;

  .brand {
    color: ${(props) => props.theme.indigo8};
    font-size: 24px;
    font-family: 'Dancing Script', cursive;
    padding-left: 1rem;
  }
  .login {
    justify-self: right;
    padding-right: 1rem;
    display: flex;
    justify-items: space-around;
    button {
      margin: 0;
    }
  }
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    grid-template-columns: 1fr 3fr 1fr;
    .brand {
      font-size: 1.75rem;
    }
  }
`

const AboutNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  grid-column: 1/-1;

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    grid-row: 1;
    grid-column: 2;
  }
`

const BrandButton = styled.button`
  padding-left: 0;
  padding-right: 0;
  :hover {
    background-color: transparent;
    color: unset;
  }
`

const LandingNav = ({ setView }) => {
  return (
    <header>
      <LandingNavStyle>
        <BrandButton
          type='button'
          className='brand'
          onClick={() => setView('aboutParent')}
        >
          dancernotes
        </BrandButton>
        <div className='login'>
          <button
            className='btn-action-primary-textOnly'
            onClick={() => setView('signin')}
          >
            Sign In
          </button>
          <button
            className='btn-action-primary-textOnly'
            onClick={() => setView('signup')}
          >
            Sign Up
          </button>
        </div>
        <AboutNav>
          <BrandButton
            onClick={() => {
              setView('aboutParent')
            }}
          >
            <p>Parents</p>
          </BrandButton>

          <BrandButton
            onClick={() => {
              setView('aboutStudio')
            }}
          >
            Studios
          </BrandButton>

          <BrandButton
            onClick={() => {
              setView('aboutRetail')
            }}
          >
            Retailers
          </BrandButton>
        </AboutNav>
      </LandingNavStyle>
    </header>
  )
}

export default LandingNav
export { LandingNavStyle, BrandButton as AboutButton }
