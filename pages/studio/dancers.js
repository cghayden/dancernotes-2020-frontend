import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import styled from "styled-components";
import {
  NewNavSidebarContainer,
  NavSection,
  NavSectionHeading,
} from "../../components/Studio/NewStudioNav";
import Dancer from "../../components/Studio/Dancer";
import { STUDIO_ALL_DANCERS_QUERY } from "../../components/Studio/Queries";

export default function newDancersPage() {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY);
  const [choice, setChoice] = useState();

  if (data) {
    return (
      <NewStudioLayout>
        <NewNavSidebarContainer>
          <NavSection>
            <h2>Dancers</h2>
            <ul>
              {data.studioDancers.map((dancer) => (
                <button
                  className={choice === dancer.id ? `activeStudioNav` : null}
                  key={dancer.id}
                  onClick={() => setChoice(dancer.id)}
                >
                  {dancer.lastName}, {dancer.firstName}
                </button>
              ))}
            </ul>
          </NavSection>
        </NewNavSidebarContainer>
        {choice && <Dancer id={choice} />}
      </NewStudioLayout>
    );
  }
  return null;
}

const SelectionWindow = styled.div`
  padding: 2rem;
  display: grid;
  justify-items: center;
`;
