import { STUDIO_DANCER } from "./Queries";
import { useQuery } from "@apollo/react-hooks";
import Card from "../styles/Card";
import styled from "styled-components";

// export default function Dancer({ id = null }) {
//   if (id) {

//   return null;
// }

const DancerInfoCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 75px 1fr;
  h4 {
    padding: 5px 0;
  }
  h5,
  h6 {
    padding: 5px 0;
  }
  a {
    padding: 0;
    margin: 0;
  }
  .personalInfo,
  .parentInfo {
    padding: 1rem 0;
  }
  .dancerName {
    grid-column: 1/-1;
    grid-row: 1;
    place-self: center;
  }
  .profile {
    grid-column: 1;
    grid-row: 2;
    border-right: 2px solid ${(props) => props.theme.gray3};
  }
  .studioInfo {
    grid-column: 2;
    grid-row: 2;
  }
`;

export default function Dancer({ id }) {
  const { data, error, loading } = useQuery(STUDIO_DANCER, {
    variables: { id },
  });
  const dancer = data && data.studioDancer;
  if (data) {
    return (
      <DancerInfoCard>
        <div className="card__header dancerName">
          <h3>
            {dancer.firstName} {dancer.lastName}
          </h3>
        </div>

        <div className="profile">
          <section className="dancerInfo">
            <h4>Personal Information</h4>
            <section>
              <h5>Address</h5>
              <p>123 Scarlet Way</p>
              <p>Begonia, MA 50877</p>
            </section>
            <section>
              <p>
                781-223-4567 <span>(Personal)</span>
              </p>
            </section>
          </section>

          <section className="parentInfo">
            <h4>Parent/Account Owner</h4>
            <p>
              {dancer.parent.firstName} {dancer.parent.lastName}
            </p>

            <section>
              <section>
                <a
                  className="btn-action-primary-textOnly"
                  href={`mailto:${dancer.parent.email}`}
                >
                  {dancer.parent.email}
                </a>
              </section>

              <section>
                <p>
                  781-223-9876 <span>(Mobile)</span>
                </p>
                <p>
                  781-508-1368<span>(Home)</span>
                </p>
                <p>
                  781-508-1368<span>(Work)</span>
                </p>
              </section>
            </section>
          </section>
          <section>
            <h4>Notes</h4>
          </section>
        </div>
        <div className="studioInfo">
          <section>
            <h4>Enrollment / Registrations</h4>
            <section>
              <h5>Classes</h5>
              <ul>
                {dancer.danceClasses.map((danceClass) => (
                  <li key={danceClass.id}>{danceClass.name}</li>
                ))}
              </ul>
            </section>
          </section>
        </div>
      </DancerInfoCard>
    );
  }
  return null;
}
