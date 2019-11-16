import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { useState, useContext } from "react";
import gql from "graphql-tag";

import BrowseStudioClasses from "../../../components/Parent/BrowseStudioClasses";
import ParentLayout from "../../../components/Parent/ParentLayout";
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
          <ParentLayout
            page={`Classes at ${studio.studioName}`}
            controls={
              <BrowseClassFilter
                studio={studio}
                filter={classFilter}
                setFilter={setFilter}
                open={showControlPanel}
                closeControls={toggleControlPanel}
              />
            }
            action={<OffScreenControlsToggler text="Filter" />}
          >
            <BrowseStudioClasses
              dancerName={dancerName}
              classFilter={classFilter}
              studio={studio}
              // dancerId={router.query.dancerId}
              toggleControls={toggleControlPanel}
            />
          </ParentLayout>
        );
      }}
    </ParentDisplayConsumer>
  );
};

export default BrowseStudioPage;
