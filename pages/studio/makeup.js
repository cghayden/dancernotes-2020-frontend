import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import StudioLayout from "../../components/Studio/StudioLayout";
import Error from "../../components/Error";
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

  if (loading) return <p>Loading...</p>;
  if (error) return error && <Error error={error} />;

  if (data.myStudio.makeupSets.length === 0) {
    return (
      <StudioLayout page="Makeup">
        <p>You have not defined any makeup Sets...</p>
        <Link href="/studio/createMakeup">
          <a>Create a Makeup Set</a>
        </Link>
      </StudioLayout>
    );
  }

  return (
    <StudioLayout page="Makeup" action={AddMakeupSet}>
      {data.myStudio.makeupSets.map(set => (
        <MakeupSetCard makeupSet={set} key={set.id} />
      ))}
    </StudioLayout>
  );
}

export default Makeup;
export { STUDIO_MAKEUP_QUERY };
