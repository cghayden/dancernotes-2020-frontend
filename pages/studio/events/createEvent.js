import NoFilterLayout from '../../../components/Studio/NoFilterLayout';
import CreateEventForm from '../../../components/Studio/CreateEventForm';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from '../../../components/Studio/Queries';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

const CreateEventPage = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);
  if (loading || error) {
    return (
      <NoFilterLayout>
        <Loading />
        <Error error={error} />
      </NoFilterLayout>
    );
  }
  return (
    <NoFilterLayout page={'Events'} selection={'Create an Event'}>
      <CreateEventForm categories={data.studioCategories} />
    </NoFilterLayout>
  );
};
export default CreateEventPage;
