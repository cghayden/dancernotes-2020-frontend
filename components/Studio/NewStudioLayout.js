import styled from "styled-components";
import NewStudioHeader from "./NewStudioHeader";
import NewStudioNav from "./NewStudioNav";

const BodyLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 200px) minmax(150px, 200px) minmax(
      400px,
      1fr
    );
`;

const Layout = styled.div`
  height: 100vh;
  .scrollingWindow {
    height: 100vh;
    overflow-y: scroll;
    display: grid;
    grid-template-rows: minmax(4rem, auto) 1fr;
    position: relative;
  }
  .selectionWindow {
    height: 100vh;
    overflow-y: scroll;
    position: relative;
    padding-top: 2rem;
  }
`;

export default function NewStudioLayout({ children }) {
  // const studio = useStudio();

  return (
    <Layout>
      <NewStudioHeader />
      <BodyLayout>
        <NewStudioNav />
        {children}
      </BodyLayout>
    </Layout>
  );
}
