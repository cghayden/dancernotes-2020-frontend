import NoNavLayout from "../../components/Studio/NoNavLayout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";
import CreateMakeupForm from "../../components/Studio/CreateMakeupForm";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

const STUDIO_CREATE_MAKEUP_QUERY = gql`
  query STUDIO_CREATE_MAKEUP_QUERY {
    myStudio {
      id
      email
      studioName
      styles
      competitiveLevels
      ageDivisions
    }
  }
`;

const CancelButton = (
  <button
    type="button"
    onClick={() =>
      Router.push({
        pathname: "/studio/makeup"
      })
    }
  >
    Cancel
  </button>
);

const CreateMakeupPage = () => {
  const { data, error, loading } = useQuery(STUDIO_CREATE_MAKEUP_QUERY);

  if (loading || error) {
    return (
      <NoNavLayout
        mobileHeader="Create a Makeup Set"
        page={"Add Makeup"}
        pageAction={CancelButton}
      >
        {loading && <Loading />}
        {error && <Error error={error} />}
      </NoNavLayout>
    );
  }

  return (
    <NoNavLayout
      mobileHeader="Create a Makeup Set"
      page={"Add Makeup"}
      pageAction={CancelButton}
    >
      <CreateMakeupForm studio={data.myStudio} />
    </NoNavLayout>
  );
};
export default CreateMakeupPage;
