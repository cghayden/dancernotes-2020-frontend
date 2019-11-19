import { useQuery } from "@apollo/react-hooks";
import { PARENTS_EVENTS_QUERY } from "../../../components/Parent/Queries";
import ParentLayout from "../../../components/Parent/ParentLayout";

function CompetitionsPage() {
  // const { data, loading, error } = useQuery(PARENTS_EVENTS_QUERY);
  // const parentUser = data ? data.parentUser : null;
  // const events = [];
  // parentUser &&
  //   parentUser.dancers.forEach(dancer =>
  //     dancer.studios.forEach(studio => events.push(studio.events)),
  //   );
  // const flatEvents = events.flat();
  // console.log("flatEvents:", flatEvents);

  return (
    <ParentLayout page={"Competitions"}>
      <p>Coming Soon!</p>
    </ParentLayout>
  );
}

export default CompetitionsPage;
