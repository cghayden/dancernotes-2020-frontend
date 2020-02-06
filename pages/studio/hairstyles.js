import React, { useState } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import NoNavLayout from "../../components/Studio/NoNavLayout";
import ContentHeader from "../../components/ContentHeader";
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

const AddHairStyle = (
  <Link href="createHairstyle">
    <a>Add a Hairstyle</a>
  </Link>
);

function HairStylesPage() {
  return (
    <NoNavLayout
      mobileHeader="Hairstyles"
      pageAction={AddHairStyle}
      page="Hairstyles"
    >
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
    </NoNavLayout>
  );
}

export default HairStylesPage;
export { HAIRSTYLES_QUERY };
