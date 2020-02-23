import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ENROLLMENT_REQUESTS_QUERY } from "./Queries";
import { ACCESS_REQUESTS_QUERY } from "./Queries";
import RequestCard from "./RequestCard";
import AccessRequestCard from "./AccessRequestCard";

const Requests = () => {
  const { data: enrollmentRequestsQuery, loading, error } = useQuery(
    ENROLLMENT_REQUESTS_QUERY
  );
  const {
    data: accessRequestQuery,
    loading: loadingAccessRequests,
    error: errorLoadingAccessRequests
  } = useQuery(ACCESS_REQUESTS_QUERY);

  const enrollmentRequests = enrollmentRequestsQuery
    ? enrollmentRequestsQuery.enrollmentRequests
    : [];
  const accessRequests = accessRequestQuery
    ? accessRequestQuery.accessRequests
    : [];
  const totalRequests = enrollmentRequests.length + accessRequests.length;
  console.log("accessRequests:", accessRequests);

  if (totalRequests === 0) {
    return <p>You have no requests at this time</p>;
  }

  return (
    <div>
      {enrollmentRequests.map(request => (
        <RequestCard key={request.id} request={request} />
      ))}
      {accessRequests.map(request => (
        <AccessRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};

export default Requests;
