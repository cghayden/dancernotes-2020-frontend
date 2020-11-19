import { useState } from 'react'
import styled from 'styled-components'
import MenuSvg from '../Icons/menu'
import NewStudioNav from './NewStudioNav'
import NewStudioSubNav from './NewStudioSubNav'
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
  position: fixed;
  top: 60px;
  right: 0;
  height: auto;
  overflow: hidden;
  z-index: 100;
  @media screen and (min-width: ${(props) => props.theme.largeScreen}) {
    display: none;
  }
`

export default function NewStudioHeader() {
  const [mobileNav, toggleMobileNav] = useState(false)
  return (
    <Header>
      <input type='text' placeholder='Search...' className='search' />
      {/* <OptionsDropdown /> */}
      <button
        className='hide-gtLarge'
        onClick={() => toggleMobileNav(!mobileNav)}
      >
        <MenuSvg />
      </button>
      {mobileNav && (
        <MobileNavContainer>
          {/* <NewStudioSubNav /> */}
          <NewStudioNav />
        </MobileNavContainer>
      )}
      <QuickCreateOptions />
    </Header>
  )
}
