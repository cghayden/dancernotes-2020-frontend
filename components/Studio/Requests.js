import RequestCard from './RequestCard'
import AccessRequestCard from './AccessRequestCard'
import Card from '../styles/Card'

const Requests = ({ enrollmentRequests, accessRequests }) => {
  const totalRequests = [...enrollmentRequests, ...accessRequests]

  if (totalRequests.length === 0) {
    return (
      <Card>
        <h2>You have no requests at this time.</h2>
      </Card>
    )
  }
  return (
    <div>
      {enrollmentRequests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
      {accessRequests.map((request) => (
        <AccessRequestCard key={request.id} request={request} />
      ))}
    </div>
  )
}

export default Requests
