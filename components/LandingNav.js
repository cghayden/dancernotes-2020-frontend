import styled from 'styled-components'

const LandingNavStyle = styled.nav`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 50px;

  .brand {
    color: ${(props) => props.theme.indigo8};
    font-size: 24px;
    font-family: 'Dancing Script', cursive;
    padding-left: 1rem;
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
`
const AboutButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  a,
  button {
    padding: 10px 5px;
    font-size: 13px;
    min-width: auto;
    @media (min-width: ${(props) => props.theme.largeScreen}) {
      padding: 10px 10px;
      font-size: 16px;
      min-width: 100;
    }
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
        <AboutButtonsDiv>
          <button
            onClick={() => {
              setView('aboutParent')
            }}
          >
            <p>Parents</p>
          </button>

          <button
            onClick={() => {
              setView('aboutStudio')
            }}
          >
            Studios
          </button>

          <button
            onClick={() => {
              setView('aboutRetail')
            }}
          >
            Retailers
          </button>
        </AboutButtonsDiv>

        <AboutNav></AboutNav>
      </LandingNavStyle>
    </header>
  )
}

export default LandingNav
export { LandingNavStyle, BrandButton as AboutButton }
