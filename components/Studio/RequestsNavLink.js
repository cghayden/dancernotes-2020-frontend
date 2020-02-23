import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";

import { ENROLLMENT_REQUESTS_QUERY } from "./Queries";
import { ACCESS_REQUESTS_QUERY } from "./Queries";

import RequestsCount from "./RequestsCount";

const RequestsNavLink = () => {
  const { data, loading, error } = useQuery(ENROLLMENT_REQUESTS_QUERY);
  const {
    data: accessRequestQuery,
    loading: loadingAccessRequests,
    error: errorLoadingAccessRequests
  } = useQuery(ACCESS_REQUESTS_QUERY);

  const enrollmentRequests = data ? data.enrollmentRequests : [];
  const accessRequests = accessRequestQuery
    ? accessRequestQuery.accessRequests
    : [];
  const totalRequests = enrollmentRequests.length + accessRequests.length;

  console.log("enrollmentRequests:", enrollmentRequests);
  console.log("accessRequests:", accessRequests);
  console.log("totalRequests:", totalRequests);

  return totalRequests > 0 ? (
    <Link href="requests">
      <a>
        Requests
        <RequestsCount count={totalRequests} />
      </a>
    </Link>
  ) : null;
};

export default RequestsNavLink;
