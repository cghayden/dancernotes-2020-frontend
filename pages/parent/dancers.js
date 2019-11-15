import { useState, Fragment } from "react";
import { animated, useTransition } from "react-spring";
import { useQuery } from "@apollo/react-hooks";

import { PARENT_USER_QUERY } from "../../components/Parent/Queries";

import AccountSubNav from "../../components/Parent/AccountSubNav";
import ParentLayout from "../../components/Parent/ParentLayout";
import CreateDancerForm from "../../components/Parent/CreateDancerForm";
import DancerCard from "../../components/Parent/DancerCard";

function DancersPage() {
  const [addDancer, toggleAddDancer] = useState(false);
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};

  const dancersTransition = useTransition(addDancer, null, {
    from: {
      opacity: 0,
      transform: "translate3d(0, 0%,0 )"
    },
    enter: {
      width: "100%",
      opacity: 1,
      transform: "translate3d(0,0,0)"
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0, 100%,0)"
    }
  });

  const transition = useTransition(addDancer, null, {
    from: {
      position: "absolute",
      textAlign: "-webkit-center",
      top: "150px",
      opacity: 0,
      transform: "translate3d(0, 100% 0)"
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0,0,0)"
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0, -100%,0)"
    }
  });

  if (loading) return "5, 6, 7, 8...";
  if (error) return `Error! ${error.message}`;

  const AddDancerButton = (
    <button onClick={() => toggleAddDancer(!addDancer)}>
      {!addDancer ? `Add a Dancer` : `Cancel`}
    </button>
  );

  return (
    <ParentLayout
      page={"My Dancers"}
      action={AddDancerButton}
      subnav={<AccountSubNav dancers={parentUser.dancers} />}
    >
      <Fragment>
        {transition.map(({ item, key, props: styles }) =>
          item ? (
            <animated.div key={key} style={styles}>
              <CreateDancerForm toggleAddDancer={toggleAddDancer} />
            </animated.div>
          ) : (
            <animated.div key={key} style={styles}>
              {parentUser.dancers &&
                parentUser.dancers.length > 0 &&
                parentUser.dancers.map(dancer => {
                  return <DancerCard key={dancer.id} dancer={dancer} />;
                })}
            </animated.div>
          )
        )}
        {/* {dancersTransition.map(
          ({ item, key, props: styles }) =>
            !item && (
              <animated.div key={key} style={styles}>
                {parentUser.dancers &&
                  parentUser.dancers.length > 0 &&
                  parentUser.dancers.map(dancer => {
                    return <DancerCard key={dancer.id} dancer={dancer} />;
                  })}
              </animated.div>
            )
        )} */}
      </Fragment>
    </ParentLayout>
  );
}

export default DancersPage;
