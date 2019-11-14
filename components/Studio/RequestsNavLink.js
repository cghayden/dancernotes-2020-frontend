import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";

import { ENROLLMENT_REQUESTS_QUERY } from "./Queries";

import RequestsCount from "./RequestsCount";

const RequestsNavLink = () => {
  const { data, loading, error } = useQuery(ENROLLMENT_REQUESTS_QUERY);
  const requests = data ? data.enrollmentRequests : {};

  return requests.length > 0 ? (
    <Link href="requests">
      <a>
        Requests
        <RequestsCount count={requests.length} />
      </a>
    </Link>
  ) : null;
};

export default RequestsNavLink;
