import { useState } from "react";
import { animated, useTransition } from "react-spring";
import { useQuery } from "@apollo/react-hooks";

import { PARENT_USER_QUERY } from "../../components/Parent/Queries";

import AccountSubNav from "../../components/Parent/AccountSubNav";
import ParentLayout from "../../components/Parent/ParentLayout";
import CreateDancerForm from "../../components/Parent/CreateDancerForm";
import Dancers from "../../components/Parent/Dancers";

const AnimatedDancers = animated(Dancers);
const AnimatedCreateDancerForm = animated(CreateDancerForm);

function DancersPage() {
  //todo - query only the dancers of the parent
  const [addDancer, toggleAddDancer] = useState(false);
  const { data, loading, error } = useQuery(PARENT_USER_QUERY);
  const parentUser = data ? data.parentUser : {};

  const transition = useTransition(addDancer, null, {
    from: {
      position: "absolute",
      // textAlign: "-webkit-center",
      top: "110px",
      opacity: 0,
      width: "100%",
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
  const hasDancers = parentUser.dancers.length > 0;
  return (
    <ParentLayout
      page={"My Dancers"}
      action={AddDancerButton}
      subnav={<AccountSubNav dancers={parentUser.dancers} />}
    >
      {transition.map(({ item, key, props: styles }) =>
        item ? (
          <animated.div key={key} style={styles}>
            <CreateDancerForm
              parentId={parentUser.id}
              style={styles}
              toggleAddDancer={toggleAddDancer}
            />
          </animated.div>
        ) : (
          <animated.div key={key} style={styles}>
            <Dancers
              addDancer={addDancer}
              toggleAddDancer={toggleAddDancer}
              style={styles}
              hasDancers={hasDancers}
              dancers={parentUser.dancers}
            />
          </animated.div>
        )
      )}
    </ParentLayout>
  );
}

export default DancersPage;
{
  /* <Fragment>
        {transition.map(({ item, key, props: styles }) =>
          item ? (
            <animated.div key={key} style={styles}>
              <CreateDancerForm toggleAddDancer={toggleAddDancer} />
            </animated.div>
          ) : (
            <animated.div key={key} style={styles}>
              {hasDancers ? (
                parentUser.dancers.map(dancer => {
                  return <DancerCard key={dancer.id} dancer={dancer} />;
                })
              ) : (
                <WelcomeMessage>
                  <div className="card__section">
                    <p>
                      Welcome to Dancernotes! To begin, add a Dancer to your
                      account, or simply browse classes at a participating
                      studio near you
                    </p>
                  </div>
                  <button
                    className="btn-dark"
                    onClick={() => toggleAddDancer(!addDancer)}
                  >
                    {!addDancer ? `Add a Dancer` : `Cancel`}
                  </button>
                </WelcomeMessage>
              )}
            </animated.div>
          )
        )}
      </Fragment> */
}
