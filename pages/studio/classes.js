import Link from "next/link";

import DanceClasses from "../../components/Studio/DanceClasses";
import ContentHeader from "../../components/ContentHeader";
import StudioLayout from "../../components/Studio/StudioLayout";

const DanceClassesPage = () => (
  <StudioLayout page={"Classes"}>
    <main>
      <ContentHeader page={"Classes"}>
        <Link href="createClass">
          <a>Add a Class</a>
        </Link>
      </ContentHeader>
      <DanceClasses />
    </main>
  </StudioLayout>
);
export default DanceClassesPage;
