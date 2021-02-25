import Link from 'next/link'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { ENROLLMENT_REQUESTS_QUERY } from './Queries'
import { ACCESS_REQUESTS_QUERY } from './Queries'
import RequestsCount from './RequestsCount'

const RequestsAnchor = styled.a`
  background-color: ${(props) => props.theme.indigo1};
  color: ${(props) => props.theme.indigo9};
  display: flex;
  align-items: center;
  :hover {
    background-color: ${(props) => props.theme.indigo9};
  }
`
const RequestsAnchorInternal = styled.div`
  display: flex;
  align-items: center;
`

const RequestsNavLink = () => {
  const { data, loading, error } = useQuery(ENROLLMENT_REQUESTS_QUERY)
  const {
    data: accessRequestQuery,
    loading: loadingAccessRequests,
    error: errorLoadingAccessRequests,
  } = useQuery(ACCESS_REQUESTS_QUERY)

  const enrollmentRequests = data ? data.enrollmentRequests : []
  const accessRequests = accessRequestQuery
    ? accessRequestQuery.accessRequests
    : []
  const totalRequests = enrollmentRequests.length + accessRequests.length

  return totalRequests > 0 ? (
    <Link href='requests'>
      <RequestsAnchor>
        <RequestsAnchorInternal>
          Requests
          <RequestsCount count={totalRequests} />
        </RequestsAnchorInternal>
      </RequestsAnchor>
    </Link>
  ) : null
}

export default RequestsNavLink
