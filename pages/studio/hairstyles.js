import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import NewNavSidebarContainer from "../../components/styles/NewNavSidebarContainer";
import NavSection from "../../components/styles/NavSection";

import Error from "../../components/Error";
import HairStyleCard from "../../components/Studio/HairStyleCard";
// import NoNavLayout from "../../components/Studio/NoNavLayout";
// import ContentHeader from "../../components/ContentHeader";

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
  const { data, error, loading } = useQuery(HAIRSTYLES_QUERY);
  const [choice, setChoice] = useState();
  return (
    <NewStudioLayout>
      <NewNavSidebarContainer>
        <NavSection>
          <h2>Hairstyles</h2>
          {data && (
            <ul>
              {data.studioHairStyles.map((hairstyle) => (
                <button
                  className={choice === hairstyle.id ? `activeStudioNav` : null}
                  key={hairstyle.id}
                  onClick={() => setChoice({ ...hairstyle })}
                >
                  {hairstyle.name}
                </button>
              ))}
            </ul>
          )}
        </NavSection>
      </NewNavSidebarContainer>
      {choice && <HairStyleCard hairStyle={choice} />}
    </NewStudioLayout>
    // </NoNavLayout>
  );
}

export default HairStylesPage;
export { HAIRSTYLES_QUERY };
