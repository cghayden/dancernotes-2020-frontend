import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { animated, useTransition } from "react-spring";

import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import RoutinesDisplay from "../../../components/Parent/RoutinesDisplay";
import CreateDancerForm from "../../../components/Parent/CreateDancerForm";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import ControlPanel from "../../../components/Parent/ControlPanel";
import OffScreenControlsToggler from "../../../components/Parent/OffscreenControlsToggler";

import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";

const ParentHome = () => {
  const [addDancer, toggleAddDancer] = useState(false);
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};
  console.log("parentUser:", parentUser);

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
      <SubNavMainControlsLayout page="Routines">
        <p>Welcome to dancernotes!</p>

        <button onClick={() => toggleAddDancer(!addDancer)}>
          Add a dancer to your account
        </button>

        {transition.map(
          ({ item, key, props: styles }) =>
            item && (
              <animated.div key={key} style={styles}>
                <CreateDancerForm toggleAddDancer={toggleAddDancer} />
              </animated.div>
            )
        )}
      </SubNavMainControlsLayout>
    );
  }
  return (
    <>
      <NotesSubNav />
      <SubNavMainControlsLayout
        page="Routines"
        action={<OffScreenControlsToggler text="Display" />}
      >
        <RoutinesDisplay dancerIds={parentUser.dancersIds} />
      </SubNavMainControlsLayout>
      <ControlPanel
        studios={parentUser.studios}
        dancerIds={parentUser.dancersIds}
        customRoutines={parentUser.customRoutines}
      />
    </>
  );
};

export default ParentHome;
