import styled from "styled-components";
import NewStudioHeader from "./NewStudioHeader";
import NewStudioNav from "./NewStudioNav";
// import NewPageOptions from "./NewPageOptions";
// import NewStudioMain from "./NewStudioMain";
// import { useStudio } from "../../components/Studio/useStudio";

const BodyLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;
const Layout = styled.div`
  height: 100vh;
`;

const NewStudioMain = styled.div`
  grid-column: 3/-1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  .selectionWindow {
    padding: 2rem 1rem;
    height: 100vh;
    overflow-y: scroll;
  }
`;

export default function NewStudioLayout({ children }) {
  // const studio = useStudio();

  return (
    <Layout>
      <NewStudioHeader />
      <BodyLayout>
        <NewStudioNav />
        <NewStudioMain>{children}</NewStudioMain>
      </BodyLayout>
    </Layout>
  );
}
