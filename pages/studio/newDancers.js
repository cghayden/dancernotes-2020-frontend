import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import NewStudioLayout from "../../components/Studio/NewStudioLayout";
import styled from "styled-components";
import PageOptions from "../../components/styles/PageOptions";
// import SelectionWindow from "../../components/styles/SelectionWindow";
import Dancer from "../../components/Studio/Dancer";
import { STUDIO_ALL_DANCERS_QUERY } from "../../components/Studio/Queries";

export default function newDancersPage() {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY);
  const [choice, setChoice] = useState();
  data && console.log("page query data:", data);

  if (data) {
    return (
      <NewStudioLayout>
        <PageOptions>
          <NavSection>
            <h2>Dancers</h2>
            <ul>
              {data.studioDancers.map((dancer) => (
                <button
                  key={dancer.id}
                  activeClassName="activeStudioNav"
                  onClick={() => setChoice(dancer.id)}
                >
                  {dancer.lastName}, {dancer.firstName}
                </button>
              ))}
            </ul>
          </NavSection>
        </PageOptions>

        {choice && (
          <SelectionWindow>
            <Dancer id={choice} />
          </SelectionWindow>
        )}
      </NewStudioLayout>
    );
  }
  return null;
}

const NavSection = styled.div`
  padding: 10px 0;
  h2 {
    color: ${(props) => props.theme.black};
    padding-left: 1rem;
  }
`;

const SelectionWindow = styled.div`
  padding: 2rem;
  display: grid;
  justify-items: center;
`;
