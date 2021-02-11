import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { PARENT_USER_QUERY } from './Queries'
import MenuSvg from '../Icons/MenuSvg'
import NewParentNav from './NewParentNav'
import QuickCreateOptions from './QuickCreateOptions'
import StaticParentQuickMenu from './StaticParentQuickMenu'
import { MobileNavContainer } from '../styles//MobileNavContainer'

const Header = styled.header`
  background: ${(props) => props.theme.gray5};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.theme.mobileHeaderHeight};
  padding: 0 20px;
  color: white;
  button {
    padding: 0;
  }
  .search {
    border-radius: 5px;
    background: ${(props) => props.theme.gray0};
    width: 40%;
    height: 20px;
  }

  @media (min-width: ${(props) => props.theme.largeScreen}) {
    height: ${(props) => props.theme.desktopHeaderHeight};
    .search {
      border-radius: 5px;
      background: ${(props) => props.theme.gray0};
      width: 30%;
      height: 30px;
    }
    button {
      padding: 0;
      margin-left: auto;
    }
  }
`

export default function NewParentHeader() {
  const [mobileNav, toggleMobileNav] = useState(false)
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  const dancers = data ? data.parentUser.dancers : []
  return (
    <Header>
      {/* <input type='text' placeholder='Search...' className='search' /> */}
      {/* <DancerNotesLogo></DancerNotesLogo> */}
      <QuickCreateOptions dancers={dancers} />
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
          <StaticParentQuickMenu dancers={dancers} />
        </MobileNavContainer>
      )}
    </Header>
  )
}
