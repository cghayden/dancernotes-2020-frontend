import { useQuery } from "@apollo/react-hooks";

import ParentLayout from "../../../components/Parent/ParentLayout";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import { PARENTS_STUDIOS } from "../../../components/Parent/Queries";
import Card from "../../../components/styles/Card";
import Error from "../../../components/Error";
import ParentUser from "../../../components/Parent/ParentUserQuery";

function MyStudiosPage() {
  const { data, loading, error } = useQuery(PARENTS_STUDIOS);
  console.log("data:", data);
  const studios = data && data.parentStudios;
  if (loading) return <p>5, 6, 7, 8...</p>;
  if (error) return <Error error={error} />;
  if (studios.length < 1) {
    return (
      <ParentLayout page={"My Studios"} subnav={<AccountSubNav />}>
        <p>
          You are not connected to any studios. When you Register your dancers
          at a studio recieve approval to subscrine to a studios information,
          the studio will apear here.
        </p>
      </ParentLayout>
    );
  }
  return (
    <ParentLayout page={"My Studios"} subnav={<AccountSubNav />}>
      {studios.map((studio, index) => (
        <Card>
          <p key={index}>{studio.studioName}</p>
        </Card>
      ))}
    </ParentLayout>
  );
}

export default MyStudiosPage;
