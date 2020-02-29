import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { useState } from "react";
import gql from "graphql-tag";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import BrowseStudioClasses from "../../../components/Parent/BrowseStudioClasses";
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import BrowseClassFilter from "../../../components/Parent/BrowseClassFilter";
import { useDisplayControls } from "../../../components/Parent/ParentDisplayProvider";
import OffScreenControlsToggler from "../../../components/Parent/OffscreenControlsToggler";

const BROWSE_STUDIO_CLASSES_QUERY = gql`
  query BROWSE_STUDIO_CLASSES_QUERY($id: ID!) {
    studio(where: { id: $id }) {
      id
      studioName
      competitiveLevels
      styles
      ageDivisions
      danceClasses {
        id
        name
        day
        startTime
        endTime
        style
        competitiveLevel
        ageDivision
        size
        dancers {
          firstName
          id
        }
      }
    }
  }
`;

const BrowseStudioPage = () => {
  const [classFilter, setFilter] = useState({});
  const { showControlPanel, toggleControlPanel } = useDisplayControls();

  const router = useRouter();
  const { data: studioData, loading: loading, error: error } = useQuery(
    BROWSE_STUDIO_CLASSES_QUERY,
    {
      variables: { id: router.query.studioId }
    }
  );
  const studio = studioData ? studioData.studio : {};
  if (loading || error)
    return (
      <>
        <AccountSubNav />
        <SubNavMainControlsLayout mobileHeader={"Account"}>
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainControlsLayout>
      </>
    );

  return (
    <>
      <AccountSubNav />
      <SubNavMainControlsLayout
        mobileHeader="My Account"
        page={`Classes at ${studio.studioName}`}
        pageAction={<OffScreenControlsToggler text="Filter" />}
      >
        <BrowseStudioClasses
          classFilter={classFilter}
          studio={studio}
          toggleControls={toggleControlPanel}
        />
        <BrowseClassFilter
          studio={studio}
          filter={classFilter}
          setFilter={setFilter}
          open={showControlPanel}
          closeControls={toggleControlPanel}
        />
      </SubNavMainControlsLayout>
    </>
  );
};

export default BrowseStudioPage;
export { BROWSE_STUDIO_CLASSES_QUERY };
