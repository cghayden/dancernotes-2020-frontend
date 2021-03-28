import { useQuery } from '@apollo/client';
import NewStudioLayout from '../../../components/Studio/NewStudioLayout';
import EventsList from '../../../components/Studio/EventsList';
import { STUDIO_EVENTS_QUERY } from '../../../components/Studio/Queries';
import { useContext } from 'react';
import { FilterContext } from '../../../components/Studio/FilterContext';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

export default function eventsIndex() {
  const { filter: userFilter } = useContext(FilterContext);
  const activeFilterChoices = Object.values(userFilter).flat();
  const { data, error, loading } = useQuery(STUDIO_EVENTS_QUERY);

  //   const filteredEvents = data?.filter((dancer) => {
  //     const dancerValues = []
  //     dancer.danceClasses.forEach((danceClass) => {
  //       const danceClassValues = Object.values(danceClass)
  //       dancerValues.push(...danceClassValues)
  //     })
  //     return activeFilterChoices?.every((filterChoice) =>
  //       dancerValues.includes(filterChoice)
  //     )
  //   })

  if (error || loading) {
    return (
      <NewStudioLayout page={'Events'}>
        {error && <Error error={error} />}
        {loading && <Loading />}
      </NewStudioLayout>
    );
  }

  return (
    <NewStudioLayout page={'Events'} createLink={`/studio/events/createEvent`}>
      <EventsList events={data?.myStudio.events} />
    </NewStudioLayout>
  );
}
