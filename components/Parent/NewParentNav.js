import StyledLink from '../StyledLink'
import {
  NewNavSidebarContainer,
  NavSectionHeading,
  NavSection,
} from '../styles/NewNavStyles'

export default function NewParentNav() {
  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>Notes</h2>
        </NavSectionHeading>
        <ul>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/routines'
            >
              <a className='btn-nav'>Routines</a>
            </StyledLink>
          </li>

          <li>
            <StyledLink activeClassName='activeStudioNav' href='/parent/events'>
              <a className='btn-nav'>Events</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/hairstyles'
            >
              <a className='btn-nav'>Hair Styles</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName='activeStudioNav' href='/parent/makeup'>
              <a className='btn-nav'>Makeup</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>My Account</h2>
        <ul>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/dancers'
            >
              <a className='btn-nav'>Dancers</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/studios'
            >
              <a className='btn-nav'>My Studios</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/account'
            >
              <a className='btn-nav'>My Account</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>Discover</h2>
        <ul>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/retailers'
            >
              <a className='btn-nav'>Shop</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/conventions'
            >
              <a className='btn-nav'>Conventions</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/intensives'
            >
              <a className='btn-nav'>Intensives</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName='activeStudioNav' href='/parent/camps'>
              <a className='btn-nav'>Camps</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/auditions'
            >
              <a className='btn-nav'>Auditions</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/parent/performances'
            >
              <a className='btn-nav'>Performances</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  )
}

export { NavSection, NewNavSidebarContainer, NavSectionHeading }
