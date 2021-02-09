import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import styled from 'styled-components'
import MenuSvg from '../Icons/MenuSvg'
import NewParentNav from './NewParentNav'
import QuickCreateOptions from './QuickCreateOptions'
import StaticParentQuickMenu from './StaticParentQuickMenu'
import { MobileNavContainer } from '../styles//MobileNavContainer'
import { PARENT_USER_QUERY } from './Queries'

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

export default function NewParentHeader() {
  const [mobileNav, toggleMobileNav] = useState(false)
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  const dancers = data ? data.parentUser.dancers : []
  return (
    <Header>
      <input type='text' placeholder='Search...' className='search' />
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
