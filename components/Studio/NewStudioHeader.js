import { useState } from 'react'
import MenuSvg from '../Icons/MenuSvg'
import NewStudioNav from './NewStudioNav'
import QuickCreateOptions from './QuickCreateOptions'
import { MobileNavContainer } from '../styles//MobileNavContainer'
import StaticStudioQuickMenu from './StaticStudioQuickMenu'
import { HeaderStyles } from '../styles/HeaderStyles'

export default function NewStudioHeader() {
  const [showMobileNav, toggleShowMobileNav] = useState(false)
  return (
    <HeaderStyles>
      <input type='text' placeholder='Search...' className='search' />
      <QuickCreateOptions />
      <button
        className='hide-gtLarge btn-icon'
        onClick={() => {
          toggleShowMobileNav((showMobileNav) => !showMobileNav)
        }}
      >
        <MenuSvg />
      </button>
      <MobileNavContainer showMobileNav={showMobileNav}>
        <NewStudioNav />
        <StaticStudioQuickMenu />
      </MobileNavContainer>
    </HeaderStyles>
  )
}
