import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { animated, useTransition } from "react-spring";

import ParentLayout from "../../../components/Parent/ParentLayout";

import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import RoutinesDisplay from "../../../components/Parent/RoutinesDisplay";
import MobileNav from "../../../components/Parent/MobileNav";
import ParentUserQuery from "../../../components/Parent/ParentUserQuery";
import ContentLayout from "../../../components/ContentLayout";
import DesktopNav from "../../../components/Parent/DesktopNav";
import CreateDancerForm from "../../../components/Parent/CreateDancerForm";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import ContentHeader from "../../../components/ContentHeader";
import ControlPanel from "../../../components/Parent/ControlPanel";
import OffScreenControlsToggler from "../../../components/Parent/OffscreenControlsToggler";

import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";

const ParentHome = () => {
  const [addDancer, toggleAddDancer] = useState(false);
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};
  const addDancerButton = (
    <button onClick={() => toggleAddDancer(!addDancer)}>
      Add a dancer to your account
    </button>
  );
  const transition = useTransition(addDancer, null, {
    from: {
      display: "grid",
      placeItems: "center",
      opacity: 0,
      transform: "translate3d(100%, 0,0)"
    },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(100%, 0,0)" }
  });

  if (loading) return <p>loading...</p>;
  if (!parentUser.dancers || parentUser.dancers.length < 1) {
    return (
      <ParentLayout page="Routines">
        <p>Welcome to dancernotes!</p>

        <button onClick={() => toggleAddDancer(!addDancer)}>
          Add a dancer to your account
        </button>

        {/* <button disabled>Find / Browse a studio near me.</button> */}
        {transition.map(
          ({ item, key, props: styles }) =>
            item && (
              <animated.div key={key} style={styles}>
                <CreateDancerForm toggleAddDancer={toggleAddDancer} />
              </animated.div>
            )
        )}
      </ParentLayout>
    );
  }
  return (
    <ParentLayout
      page="Routines"
      action={<OffScreenControlsToggler text="Display" />}
      subnav={<NotesSubNav dancers={parentUser.dancers} />}
      controls={
        <ControlPanel
          dancerIds={parentUser.dancersIds}
          dancers={parentUser.dancers}
        />
      }
    >
      <RoutinesDisplay dancerIds={parentUser.dancersIds} />
    </ParentLayout>
  );
};

export default ParentHome;
