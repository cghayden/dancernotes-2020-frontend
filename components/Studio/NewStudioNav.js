import { useQuery } from '@apollo/client'
import StyledLink from '../StyledLink'
import { STUDIO_REQUESTS_QUERY } from './Queries'
import RequestsCount from './RequestsCount'
import {
  NewNavSidebarContainer,
  NavSectionHeading,
  NavSection,
} from '../styles/NewNavStyles'

export default function NewStudioNav() {
  const { data, loading, error } = useQuery(STUDIO_REQUESTS_QUERY)

  const requests = data
    ? [...data.myStudio.accessRequests, ...data.myStudio.enrollmentRequests]
    : []

  return (
    <NewNavSidebarContainer>
      <NavSection>
        <NavSectionHeading>
          <h2>Manage</h2>
        </NavSectionHeading>
        <ul>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/classes'
            >
              <a className='btn-nav'>Classes</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/dancers'
            >
              <a className='btn-nav'>Dancers</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName='activeStudioNav' href='/studio/events'>
              <a className='btn-nav'>Events</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/hairstyles'
            >
              <a className='btn-nav'>Hair Styles</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink activeClassName='activeStudioNav' href='/studio/makeup'>
              <a className='btn-nav'>Makeup</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
      <NavSection>
        <h2>Accounts</h2>
        <ul>
          {requests.length > 0 && (
            <li style={{ position: 'relative' }}>
              <StyledLink
                activeClassName='activeStudioNav'
                href='/studio/requests'
              >
                <a className='btn-nav'>Requests</a>
              </StyledLink>
              <RequestsCount count={requests.length} />
            </li>
          )}
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/accounts'
            >
              <a className='btn-nav'>Accounts</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/retailers'
            >
              <a className='btn-nav'>Retailers</a>
            </StyledLink>
          </li>
          <li>
            <StyledLink
              activeClassName='activeStudioNav'
              href='/studio/myStudio'
            >
              <a className='btn-nav'>My Studio</a>
            </StyledLink>
          </li>
        </ul>
      </NavSection>
    </NewNavSidebarContainer>
  )
}
