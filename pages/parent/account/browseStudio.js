import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { useState, useContext } from "react";
import gql from "graphql-tag";

import DesktopNav from "../../../components/Parent/DesktopNav";
import BrowseStudioClasses from "../../../components/Parent/BrowseStudioClasses";
import MobileNav from "../../../components/Parent/MobileNav";
import ContentLayout from "../../../components/ContentLayout";
import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import ContentHeader from "../../../components/ContentHeader";
import BrowseClassFilter from "../../../components/Parent/BrowseClassFilter";
import { ParentDisplayConsumer } from "../../../components/ParentDisplayProvider";
import OffScreenControlsToggler from "../../../components/Parent/OffscreenControlsToggler";

import { RegistrationContext } from "../../../components/Parent/RegistrationContext";

const BROWSE_STUDIO_CLASSES_QUERY = gql`
  query BROWSE_STUDIO_CLASSES_QUERY($id: ID!) {
    studio(where: { id: $id }) {
      id
      studioName
      levels
      styles
      divisions
      danceClasses {
        id
        name
        day
        startTime
        endTime
        style
        level
        division
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
  const browsingDancer = useContext(RegistrationContext);
  const router = useRouter();
  const {
    data: studioData,
    loading: classesLoading,
    error: classesError
  } = useQuery(BROWSE_STUDIO_CLASSES_QUERY, {
    variables: { id: router.query.studioId }
  });
  const dancerName = browsingDancer.browsingDancerName;
  const studio = studioData ? studioData.studio : {};

  return (
    <ParentDisplayConsumer>
      {({ showControlPanel, toggleControlPanel }) => {
        return (
          <>
            <MobileStatusBar page={`Account > Browse Studio > ${dancerName}`}>
              <OffScreenControlsToggler text="Filter" />
            </MobileStatusBar>
            <MobileNav />
            <DesktopNav />
            <ContentLayout>
              <ContentHeader page={`Classes at ${studio.studioName}`}>
                {/* <button onClick={toggleControlPanel}>Filter</button> */}
              </ContentHeader>
              <main className="main">
                <BrowseStudioClasses
                  dancerName={dancerName}
                  classFilter={classFilter}
                  studio={studio}
                  dancerId={router.query.dancerId}
                  toggleControls={toggleControlPanel}
                />
              </main>
              <BrowseClassFilter
                studio={studio}
                filter={classFilter}
                setFilter={setFilter}
                open={showControlPanel}
                closeControls={toggleControlPanel}
              />
            </ContentLayout>
          </>
        );
      }}
    </ParentDisplayConsumer>
  );
};

export default BrowseStudioPage;
