import Link from "next/link";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import ClassesSubNav from "../../components/Studio/ClassesSubNav";

import DanceClasses from "../../components/Studio/DanceClasses";

const AddClassButton = (
  <Link href="createClass">
    <a>Add a Class</a>
  </Link>
);

const DanceClassesPage = () => (
  <>
    <ClassesSubNav />
    <SubNavMainLayout
      page="Classes"
      mobileHeader="Classes"
      pageAction={AddClassButton}
    >
      <DanceClasses />
    </SubNavMainLayout>
  </>
);
export default DanceClassesPage;
