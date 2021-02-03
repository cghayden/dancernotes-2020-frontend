import { useState } from 'react'
import styled from 'styled-components'
import MenuSvg from '../Icons/MenuSvg'
import NewParentNav from './NewParentNav'
import QuickCreateOptions from './QuickCreateOptions'

const Header = styled.header`
  background: ${(props) => props.theme.gray5};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.theme.studioHeaderHeight};
  padding: 0 20px;
  color: white;
  button {
    padding: 0;
  }
  .search {
    border-radius: 5px;
    background: ${(props) => props.theme.gray0};
    width: 30%;
    height: 30px;
  }
`

const MobileNavContainer = styled.div`
  background: ${(props) => props.theme.gray1};
  box-shadow: ${(props) => props.theme.dropShadow3};

  /* color: ${(props) => props.theme.blackText}; */
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  width: 90vw;
  max-width: 350px;
  position: fixed;
  top: 60px;
  right: 0;
  height: auto;
  overflow: hidden;
  z-index: 101;
  @media screen and (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`

export default function NewStudioHeader() {
  const [mobileNav, toggleMobileNav] = useState(false)
  return (
    <Header>
      <input type='text' placeholder='Search...' className='search' />
      <QuickCreateOptions />
      <button
        className='hide-gtLarge btn-icon'
        onClick={() => {
          toggleMobileNav(!mobileNav)
        }}
      >
        <MenuSvg />
      </button>
      {mobileNav && (
        <MobileNavContainer>
          <NewParentNav />
          {/* <QuickActionLinks/> */}
        </MobileNavContainer>
      )}
      {/* <QuickCreateOptions /> */}
    </Header>
  )
}
