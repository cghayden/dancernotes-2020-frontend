import DanceClasses from "../../components/Studio/DanceClasses";
import StudioLayout from "../../components/Studio/StudioLayout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import CreateMakeupForm from "../../components/Studio/CreateMakeupForm";

const STUDIO_CREATE_MAKEUP_QUERY = gql`
  query STUDIO_CREATE_MAKEUP_QUERY {
    myStudio {
      id
      email
      studioName
      styles
      competitiveLevels
      divisions
    }
  }
`;

const CancelButton = (
  <button
    type="button"
    onClick={() =>
      Router.push({
        pathname: "/studio/classes"
      })
    }
  >
    Cancel
  </button>
);

const CreateMakeupPage = () => {
  const { data, error, loading } = useQuery(STUDIO_CREATE_MAKEUP_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return error && <Error error={error} />;
  return (
    <StudioLayout page={"Classes"} pageAction={CancelButton}>
      <CreateMakeupForm studio={data.myStudio} />
    </StudioLayout>
  );
};
export default CreateMakeupPage;
