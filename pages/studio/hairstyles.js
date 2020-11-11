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

import PlusSvg from "../../components/PlusSvg";
import Error from "../../components/Error";
import HairStyleCard from "../../components/Studio/HairStyleCard";
import CreateHairStyleForm from "../../components/Studio/CreateHairStyleForm";

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

const HairstyleSelectionWindow = styled.div`
  grid-column: 4/-1;
`;

// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~;

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
              <PlusSvg />
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
      <HairstyleSelectionWindow className="selectionWindow">
        {choice && <HairStyleCard hairStyle={choice} />}
        {createNew && <CreateHairStyleForm />}
      </HairstyleSelectionWindow>
    </NewStudioLayout>
  );
}

export default HairStylesPage;
export { HAIRSTYLES_QUERY };
