import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ENROLLMENT_REQUESTS_QUERY } from "./Queries";
import RequestCard from "./RequestCard";

const Requests = () => {
  const { data, loading, error } = useQuery(ENROLLMENT_REQUESTS_QUERY);
  const requests = data ? data.enrollmentRequests : {};
  return requests.length === 0 ? (
    <p>You have no requests at this time</p>
  ) : (
    <div>
      {requests.map(request => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};

export default Requests;
