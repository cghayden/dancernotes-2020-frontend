import React from 'react'
import SubNavStyles from '../styles/SubNavStyles'
import StyledLink from '../StyledLink'
import DancernotesInfo from '../DancernotesInfo'
import styled from 'styled-components'

const DancerNotesInfoLink = styled.div``

function AccountSubNav() {
  return (
    <SubNavStyles>
      <h2 className='subNav-heading'>Account</h2>
      <ul>
        <li>
          <StyledLink activeClassName='active' href='/parent/account/dancers'>
            <a>Dancers</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName='active' href='/parent/account/studios'>
            <a>Studios</a>
          </StyledLink>
        </li>
        <li>
          <StyledLink activeClassName='active' href='/parent/account/profile'>
            <a>Profile</a>
          </StyledLink>
        </li>
      </ul>
      <DancerNotesInfoLink className='hideOnMobile'>
        <StyledLink activeClassName='active' href='/parent/support'>
          <a>Support</a>
        </StyledLink>
      </DancerNotesInfoLink>
    </SubNavStyles>
  )
}
export default AccountSubNav
