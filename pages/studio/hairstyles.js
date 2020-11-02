import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import gql from "graphql-tag";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import {
  NewNavSidebarContainer,
  NavSection,
  NavSectionHeading,
} from "../../components/Studio/NewStudioNav";

import Error from "../../components/Error";
import HairStyleCard from "../../components/Studio/HairStyleCard";
import CreateHairStyleForm from "../../components/Studio/CreateHairStyleForm";

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

// const AddHairStyle = (
//   <Link href="createHairstyle">
//     <a>Add a Hairstyle</a>
//   </Link>
// );
const HairstyleSelectionWindow = styled.div`
  grid-column: 3/-1;
`;
function HairStylesPage() {
  const { data, error, loading } = useQuery(HAIRSTYLES_QUERY);
  const [choice, setChoice] = useState();
  const [createNew, setCreateNew] = useState(false);
  return (
    <NewStudioLayout>
      <NewNavSidebarContainer>
        <NavSection>
          <NavSectionHeading>
            <h2>Hairstyles</h2>
            <button
              onClick={() => {
                setChoice(null);
                setCreateNew(true);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 23 23">
                <path
                  fill="transparent"
                  strokeWidth="3"
                  stroke="hsl(0, 0%, 18%)"
                  strokeLinecap="round"
                  opacity="1"
                  d="M 11 .5 L 11 18.346"
                ></path>
                <path
                  fill="transparent"
                  strokeWidth="3"
                  stroke="hsl(0, 0%, 18%)"
                  strokeLinecap="round"
                  opacity="1"
                  d="M 2 9.423 L 20 9.423"
                ></path>
              </svg>
            </button>
          </NavSectionHeading>
          {data && (
            <ul>
              {data.studioHairStyles.map((hairstyle) => (
                <button
                  className={choice === hairstyle.id ? `activeStudioNav` : null}
                  key={hairstyle.id}
                  onClick={() => {
                    setCreateNew(false);
                    setChoice({ ...hairstyle });
                  }}
                >
                  {hairstyle.name}
                </button>
              ))}
            </ul>
          )}
        </NavSection>
      </NewNavSidebarContainer>
      <HairstyleSelectionWindow>
        {choice && <HairStyleCard hairStyle={choice} />}
        {createNew && <CreateHairStyleForm />}
      </HairstyleSelectionWindow>
    </NewStudioLayout>
    // </NoNavLayout>
  );
}

export default HairStylesPage;
export { HAIRSTYLES_QUERY };
