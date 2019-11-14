import { useQuery } from "@apollo/react-hooks";

import MobileNav from "../../../components/Parent/MobileNav";
import ParentUserQuery from "../../../components/Parent/ParentUserQuery";
import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import ContentLayout from "../../../components/ContentLayout";
import MyProfile from "../../../components/Parent/MyProfile";
import DesktopNav from "../../../components/Parent/DesktopNav";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import ContentHeader from "../../../components/ContentHeader";
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";

//input array of parent's dancers,
// compile a list of all routines they are involved in
// each dance in list should have a dancers property that holds the info of the students enrolled in it.
const getParentsRoutines = function(dancers) {
  const parentsRoutines = [];
  for (const dancer of dancers) {
    parentsRoutines.push(dancer.danceClasses);
  }

  const allRoutinesMerged = [].concat.apply([], parentsRoutines);
  const allRoutinesDuplicatesRemoved = allRoutinesMerged.filter(function(
    routine,
    index,
  ) {
    return allRoutinesMerged.indexOf(routine) === index;
  });

  return allRoutinesDuplicatesRemoved;
};

const Profile = () => {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};

  return (
    <>
      <MobileStatusBar page={"Account > My Profile"} />
      <MobileNav />
      <DesktopNav />
      <ContentLayout>
        <AccountSubNav dancers={parentUser.dancers} />
        <main>
          <ContentHeader page={"My Profile"} />
          <MyProfile user={parentUser} />
        </main>
      </ContentLayout>
    </>
  );
};

export default Profile;

const putDancersInRoutines = function(dancers) {
  const dancesById = {};
  for (const dancer of dancers) {
    for (const dance of dancer.danceClasses) {
      // if dance is not in object, add it.
      if (!dancesById[dance.id]) {
        dancesById[dance.id] = dance;
      }
      // if dance has a 'dancers' property already, add current dancer
      if (dancesById[dance.id]["dancers"]) {
        dancesById[dance.id]["dancers"].push(dancer);
      }
      // add a 'dancers' property to dance and then add current dancer
      else {
        dancesById[dance.id]["dancers"] = [];
        dancesById[dance.id]["dancers"].push(dancer);
      }
    }
  }
};
