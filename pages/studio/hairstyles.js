import React, { useState } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import StudioLayout from "../../components/Studio/StudioLayout";
import ContentHeader from "../../components/ContentHeader";
import CreateHairStyleForm from "../../components/Studio/CreateHairStyleForm";
import Error from "../../components/Error";
import HairStyleCard from "../../components/Studio/HairStyleCard";

const HAIRSTYLES_QUERY = gql`
  query HAIRSTYLES_QUERY {
    studioHairStyles {
      id
      name
      description
      image
      link
    }
  }
`;

function HairStylesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <StudioLayout>
      <main>
        <ContentHeader page={"Hair Styles"}>
          <button onClick={() => setShowForm(!showForm)}>New Hair Style</button>
        </ContentHeader>
        {showForm ? (
          <CreateHairStyleForm closeForm={setShowForm} />
        ) : (
          <Query query={HAIRSTYLES_QUERY}>
            {({ data: { studioHairStyles } = {}, loading, error }) => {
              if (error) return <Error error={error} />;
              if (loading) return <h5>Loading...</h5>;
              return (
                <>
                  {studioHairStyles.map(style => (
                    <HairStyleCard hairStyle={style} key={style.id} />
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

export default HairStylesPage;
export { HAIRSTYLES_QUERY };
