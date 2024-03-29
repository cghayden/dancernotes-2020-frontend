import { useQuery } from '@apollo/client';
import {
  PARENT_EVENTS_QUERY,
  CUSTOM_EVENTS_QUERY,
  ALL_Rs,
} from '../../../components/Parent/Queries';
import ParentNoFilterLayout from '../../../components/Parent/ParentNoFilterLayout';
import EventsContent from '../../../components/Parent/EventsContent';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

// import { useParentEvents } from '../../../components/Parent/useParentEvents'

function EventsPage() {
  //events entered by studios
  const {
    data: parentEvents,
    loading: loadingEvents,
    error: errorLoadingEvents,
  } = useQuery(PARENT_EVENTS_QUERY);
  // console.log('parentEvents', parentEvents);

  //events entered by parent
  const {
    data: customEvents,
    loading: loadingCustomEvents,
    error: errorLoadingCustomEvents,
  } = useQuery(CUSTOM_EVENTS_QUERY);
  console.log('customEvents', customEvents);

  const {
    data: allRoutinesData,
    loading: loadingRoutines,
    error: errorLoadingRoutines,
  } = useQuery(ALL_Rs);
  const allRoutines = allRoutinesData ? allRoutinesData.allRs : [];

  const loading = loadingEvents || loadingRoutines || loadingCustomEvents;
  const error =
    errorLoadingEvents || errorLoadingRoutines || errorLoadingCustomEvents;

  if (error || loading) {
    return (
      <ParentNoFilterLayout page={'Events'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </ParentNoFilterLayout>
    );
  }

  return (
    <ParentNoFilterLayout
      page={'Events'}
      createLink={`/parent/events/createEvent`}
    >
      <EventsContent
        allRoutines={allRoutines}
        allEvents={parentEvents.parentEvents}
        customEvents={customEvents.customEvents}
      />
    </ParentNoFilterLayout>
  );
}

export default EventsPage;
