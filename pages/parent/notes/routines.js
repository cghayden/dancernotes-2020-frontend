import { useQuery } from "@apollo/react-hooks"
import Link from "next/link"
import Loading from "../../../components/Loading"
import Error from "../../../components/Error"
import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout"
import NoNavLayout from "../../../components/NoNavLayout"
import RoutinesDisplay from "../../../components/Parent/RoutinesDisplay"
import Card from "../../../components/styles/Card"
import NotesSubNav from "../../../components/Parent/NotesSubNav"
import ControlPanel from "../../../components/Parent/ControlPanel"
import TermsAndPrivacy from "../../../components/TermsAndPrivacy"
import { PARENT_USER_QUERY } from "../../../components/Parent/Queries"

const ParentHome = () => {
  const { data, loading, error } = useQuery(PARENT_USER_QUERY)
  const parentUser = data ? data.parentUser : {}
  const AddRoutineButton = (
    <Link href="/parent/createCustomRoutine">
      <a className="btn-action-primary-textOnly">Create a Routine</a>
    </Link>
  )

  if (loading || error)
    return (
      <>
        <NotesSubNav />
        <SubNavMainControlsLayout
          mobileHeader={"Notes"}
          page="Routines"
          pageAction={AddRoutineButton}
        >
          {loading && <Loading />}
          {error && <Error error={error} />}
        </SubNavMainControlsLayout>
      </>
    )

  if (!parentUser.dancers || parentUser.dancers.length < 1) {
    return (
      <>
        <NoNavLayout mobileHeader={"Notes"} page="Routines">
          <Card>
            <div className="card__section">
              <p>Welcome to dancernotes!</p>
              <p>
                To begin, use the link below to add Dancers to your account.
              </p>
            </div>
            <div className="card__section">
              <Link href="/parent/account/addDancer">
                <a className="btn-action-primary">Add a Dancer</a>
              </Link>
            </div>
          </Card>
        </NoNavLayout>
      </>
    )
  }
  return (
    <>
      <NotesSubNav />
      <SubNavMainControlsLayout
        page="All Routines"
        mobileHeader="Notes"
        pageAction={AddRoutineButton}
        offscreenToggler="Filter"
      >
        {!parentUser.agreedToTermsAndPrivacy && <TermsAndPrivacy />}

        <RoutinesDisplay dancerIds={parentUser.dancersIds} />
      </SubNavMainControlsLayout>
      <ControlPanel
        studios={parentUser.studios}
        customRoutines={parentUser.customRoutines}
        dancers={parentUser.dancers}
      />
    </>
  )
}

export default ParentHome
