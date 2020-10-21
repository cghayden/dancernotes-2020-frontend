import styled from "styled-components";
import NewStudioHeader from "./NewStudioHeader";
import NewStudioNav from "./NewStudioNav";
// import NewPageOptions from "./NewPageOptions";
// import NewStudioMain from "./NewStudioMain";
import { useStudio } from "../../components/Studio/useStudio";

const BodyLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;
const Layout = styled.div`
  min-height: 100vh;
`;

const NewStudioMain = styled.div`
  display: flex;
  /* grid-template-columns: auto 1fr; */
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
