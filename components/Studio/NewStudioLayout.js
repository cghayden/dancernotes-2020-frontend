import styled from "styled-components";
import NewStudioHeader from "./NewStudioHeader";
import NewStudioNav from "./NewStudioNav";
// import NewPageOptions from "./NewPageOptions";
// import NewStudioMain from "./NewStudioMain";
import { useStudio } from "../../components/Studio/useStudio";

const BodyLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: ${(props) => props.theme.studioHeaderHeight} 1fr;
  height: 100vh;
  .selectionWindow {
    /* height: 100vh; */
    width: 100%;
    /* overflow-y: scroll; */
  }
`;
const Layout = styled.div`
  height: 100vh;
`;

const NewStudioMain = styled.div`
  display: grid;
  width: 100%;
  grid-column: 2/-1;
  grid-row: 2/-1;
  overflow-y: scroll;
  margin-top: ${(props) => props.theme.filterTopHeight};
`;

export default function NewStudioLayout({ children }) {
  const studio = useStudio();

  return (
    <Layout>
      <NewStudioHeader />
      <BodyLayout className="bodyLayout">
        <NewStudioNav />
        {/* subnav on every page */}
        <NewStudioMain>{children}</NewStudioMain>
      </BodyLayout>
    </Layout>
  );
}
