import { useState } from "react";
import { animated, useTransition } from "react-spring";

import CreateDancerForm from "../../../components/Parent/CreateDancerForm";
import MobileNav from "../../../components/Parent/MobileNav";
import DesktopNav from "../../../components/Parent/DesktopNav";
import MobileStatusBar from "../../../components/Parent/MobileStatusBar";
import ParentUserQuery from "../../../components/Parent/ParentUserQuery";
import ContentLayout from "../../../components/ContentLayout";
import DancerCard from "../../../components/Parent/DancerCard";
import ContentHeader from "../../../components/ContentHeader";
import AccountSubNav from "../../../components/Parent/AccountSubNav";
function DancersPage() {
  const [addDancer, toggleAddDancer] = useState(false);
  const dancersTransition = useTransition(addDancer, null, {
    from: {
      opacity: 0,
      transform: "translate3d(0, 0%,0 )",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0,0,0)",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0, 100%,0)",
    },
  });
  const transition = useTransition(addDancer, null, {
    from: {
      position: "absolute",
      top: "150px",
      opacity: 0,
      transform: "translate3d(0, 100% 0)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0,0,0)",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0, -100%,0)",
    },
  });

  return (
    <ParentUserQuery>
      {({ data, loading, error }) => {
        if (loading) return "5, 6, 7, 8...";
        if (error) return `Error! ${error.message}`;
        const parentUser = data ? data.parentUser : {};
        return (
          <>
            <MobileStatusBar
              dancers={
                parentUser.dancers && parentUser.dancers.length < 1
                  ? []
                  : parentUser.dancers
              }
              page={"Account > My Dancers"}
            >
              <button onClick={() => toggleAddDancer(!addDancer)}>
                Add a Dancer
              </button>
            </MobileStatusBar>
            <MobileNav />
            <DesktopNav />
            <ContentLayout>
              <AccountSubNav />
              <main>
                <ContentHeader page={"My Dancers"}>
                  <button onClick={() => toggleAddDancer(!addDancer)}>
                    Add a Dancer
                  </button>
                </ContentHeader>
                {transition.map(
                  ({ item, key, props: styles }) =>
                    item && (
                      <animated.div key={key} style={styles}>
                        <CreateDancerForm toggleAddDancer={toggleAddDancer} />
                      </animated.div>
                    ),
                )}
                {dancersTransition.map(
                  ({ item, key, props: styles }) =>
                    !item && (
                      <animated.div key={key} style={styles}>
                        {parentUser.dancers &&
                          parentUser.dancers.length > 0 &&
                          parentUser.dancers.map(dancer => {
                            return (
                              <DancerCard key={dancer.id} dancer={dancer} />
                            );
                          })}
                      </animated.div>
                    ),
                )}
              </main>
            </ContentLayout>
          </>
        );
      }}
    </ParentUserQuery>
  );
}

export default DancersPage;
