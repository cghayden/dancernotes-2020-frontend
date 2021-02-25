import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { PARENT_USER_QUERY } from './Queries'
import MenuSvg from '../Icons/MenuSvg'
import NewParentNav from './NewParentNav'
import QuickCreateOptions from './QuickCreateOptions'
import StaticParentQuickMenu from './StaticParentQuickMenu'
import { MobileNavContainer } from '../styles//MobileNavContainer'
import { HeaderStyles } from '../styles/HeaderStyles'

export default function NewParentHeader() {
  const [showMobileNav, toggleShowMobileNav] = useState(false)
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  const dancers = data ? data.parentUser.dancers : []
  return (
    <HeaderStyles>
      {/* <input type='text' placeholder='Search...' className='search' /> */}
      {/* <DancerNotesLogo></DancerNotesLogo> */}
      <QuickCreateOptions dancers={dancers} />
      <button
        className='hide-gtLarge btn-icon'
        onClick={() => {
          toggleShowMobileNav((showMobileNav) => !showMobileNav)
        }}
      >
        <MenuSvg />
      </button>
      <MobileNavContainer showMobileNav={showMobileNav}>
        <NewParentNav />
        <StaticParentQuickMenu dancers={dancers} />
      </MobileNavContainer>
    </HeaderStyles>
  )
}
