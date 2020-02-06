import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import NoNavLayout from "../../components/Studio/NoNavLayout";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import MakeupSetCard from "../../components/Studio/MakeupSetCard";

const STUDIO_MAKEUP_QUERY = gql`
  query STUDIO_MAKEUP_QUERY {
    myStudio {
      id
      makeupSets {
        id
        name
        lipstick
        applyTo
      }
    }
  }
`;

function Makeup() {
  const { data, error, loading } = useQuery(STUDIO_MAKEUP_QUERY);
  const AddMakeupSet = (
    <Link href="/studio/createMakeup">
      <a>Create a Makeup Set</a>
    </Link>
  );

  if (loading || error)
    return (
      <NoNavLayout mobileHeader="Makeup" page="Makeup">
        {loading && <Loading />}
        {error && <Error error={error} />}
        <Link href="/studio/createMakeup">
          <a>Create a Makeup Set</a>
        </Link>
      </NoNavLayout>
    );

  if (data.myStudio.makeupSets.length === 0) {
    return (
      <NoNavLayout mobileHeader="Makeup" page="Makeup">
        <p>You have not defined any makeup Sets...</p>
        <Link href="/studio/createMakeup">
          <a>Create a Makeup Set</a>
        </Link>
      </NoNavLayout>
    );
  }

  return (
    <StudioLayout page="Makeup" pageAction={AddMakeupSet}>
      {data.myStudio.makeupSets.map(set => (
        <MakeupSetCard makeupSet={set} key={set.id} />
      ))}
    </StudioLayout>
  );
}

export default Makeup;
export { STUDIO_MAKEUP_QUERY };
