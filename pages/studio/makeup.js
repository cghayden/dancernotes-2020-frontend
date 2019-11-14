import React, { useState } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import StudioLayout from "../../components/Studio/StudioLayout";
import ContentHeader from "../../components/ContentHeader";
import CreateMakeupForm from "../../components/Studio/CreateMakeupForm";
import Error from "../../components/Error";
import MakeupSetCard from "../../components/Studio/MakeupSetCard";

const MAKEUP_QUERY = gql`
  query MAKEUP_QUERY {
    makeupSets {
      id
      name
      lipstick
      eyeShadow
      applyTo
      danceClasses {
        name
      }
    }
  }
`;

function Makeup() {
  const [showForm, setShowForm] = useState(false);

  return (
    <StudioLayout>
      <main>
        <ContentHeader page={"Makeup"}>
          <button onClick={() => setShowForm(!showForm)}>New Makeup Set</button>
        </ContentHeader>
        {showForm ? (
          <CreateMakeupForm closeForm={setShowForm} />
        ) : (
          <Query query={MAKEUP_QUERY}>
            {({ data: { makeupSets } = {}, loading, error }) => {
              if (error) return <Error error={error} />;
              if (loading) return <h5>Loading...</h5>;
              return (
                <>
                  {makeupSets.map(set => (
                    <MakeupSetCard makeupSet={set} key={set.id} />
                  ))}
                </>
              );
            }}
          </Query>
        )}
      </main>
    </StudioLayout>
  );
}

export default Makeup;
export { MAKEUP_QUERY };
