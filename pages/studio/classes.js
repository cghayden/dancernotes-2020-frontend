import Link from "next/link";

import DanceClasses from "../../components/Studio/DanceClasses";
import StudioLayout from "../../components/Studio/StudioLayout";

const AddClassButton = (
  <Link href="createClass">
    <a>Add a Class</a>
  </Link>
);

const DanceClassesPage = () => (
  <StudioLayout page={"Classes"} pageAction={AddClassButton}>
    <DanceClasses />
  </StudioLayout>
);
export default DanceClassesPage;
