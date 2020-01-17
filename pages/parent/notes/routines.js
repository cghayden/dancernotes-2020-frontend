import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Error from "../../../components/Error";
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import RoutinesDisplay from "../../../components/Parent/RoutinesDisplay";
import CreateDancerForm from "../../../components/Parent/CreateDancerForm";
import NotesSubNav from "../../../components/Parent/NotesSubNav";
import ControlPanel from "../../../components/Parent/ControlPanel";
import OffScreenControlsToggler from "../../../components/Parent/OffscreenControlsToggler";

import { PARENT_USER_QUERY } from "../../../components/Parent/Queries";

const ParentHome = () => {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};

  if (loading) return <p>loading...</p>;
  if (error) return <Error error={error} />;
  //if no dancers, propmt to add a dancer
  if (!parentUser.dancers || parentUser.dancers.length < 1) {
    return (
      <>
        <NotesSubNav />
        <SubNavMainControlsLayout page="Routines">
          <p>Welcome to dancernotes!</p>
          <p>To begin use the form below to add a Dancer to your account.</p>
          <CreateDancerForm />
        </SubNavMainControlsLayout>
      </>
    );
  }

  //if no routines, prompt to create a routine or search for a studio
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
