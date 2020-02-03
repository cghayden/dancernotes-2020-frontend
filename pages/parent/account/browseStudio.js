import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { useState, useContext } from "react";
import gql from "graphql-tag";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
import BrowseStudioClasses from "../../../components/Parent/BrowseStudioClasses";
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import BrowseClassFilter from "../../../components/Parent/BrowseClassFilter";
import { ParentDisplayConsumer } from "../../../components/ParentDisplayProvider";
import OffScreenControlsToggler from "../../../components/Parent/OffscreenControlsToggler";

import { RegistrationContext } from "../../../components/Parent/RegistrationContext";

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
  // let browsingDancer = useContext(RegistrationContext);
  // console.log("browsingDancer from context:", browsingDancer);
  // if (!browsingDancer.Id) {
  //   // browsingDancer = localStorage.getItem("browsingDancer");
  //   console.log("browsingDancer from local Storage:", browsingDancer);
  // }
  const router = useRouter();
  const { data: studioData, loading: loading, error: error } = useQuery(
    BROWSE_STUDIO_CLASSES_QUERY,
    {
      variables: { id: router.query.studioId }
    }
  );
  // const dancerName = browsingDancer.browsingDancerName;
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
    <ParentDisplayConsumer>
      {({ showControlPanel, toggleControlPanel }) => {
        return (
          <>
            <AccountSubNav />
            <SubNavMainControlsLayout
              page={`Classes at ${studio.studioName}`}
              pageAction={<OffScreenControlsToggler text="Filter" />}
            >
              <BrowseStudioClasses
                // dancerName={dancerName}
                classFilter={classFilter}
                studio={studio}
                // dancerId={router.query.dancerId}
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
      }}
    </ParentDisplayConsumer>
  );
};

export default BrowseStudioPage;
