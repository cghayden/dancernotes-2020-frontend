import AddDancers from "../../components/Studio/AddDancers";
import NoNavLayout from "../../components/Studio/NoNavLayout";

const AddDancersPage = props => (
  <NoNavLayout>
    <AddDancers id={props.query.id} />
  </NoNavLayout>
);
export default AddDancersPage;
