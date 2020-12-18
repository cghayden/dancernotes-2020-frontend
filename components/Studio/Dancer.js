import Card from '../styles/Card'
import styled from 'styled-components'

const DancerCard = styled(Card)`
  display: grid;
  grid-gap: 0.5rem;
  max-width: 1000px;
  font-size: 18px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 75px 1fr;
  text-align: left;
  justify-items: center;
  section {
    padding-right: 0.5rem;
  }
  h4 {
    padding: 5px 0;
  }
  h5,
  h6 {
    padding: 5px 0;
  }
  a {
    padding: 2px 0;
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
    width: 90%;
    display: flex;
    align-items: center;
    /* justify-content: space-b */
  }
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 25px;
    margin: 0 0.25rem;
    object-fit: cover;

    @media (min-width: ${(props) => props.theme.largeScreen}) {
      width: 42px;
      height: 42px;
    }
    margin-right: auto;
  }
  .profile {
    grid-column: 1;
    grid-row: 2;
    border-right: 2px solid ${(props) => props.theme.gray3};
    justify-items: stretch;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-rows: auto 1fr;
  }
  .studioInfo {
    grid-column: 2;
    grid-row: 2;
  }
`

export default function Dancer({ dancer }) {
  return (
    <DancerCard>
      <div className='card__header dancerName'>
        {dancer.avatar && <img src={dancer.avatar} alt={dancer.firstName} />}
        <h3>
          {dancer.firstName} {dancer.lastName}
        </h3>
      </div>

      <div className='profile'>
        <section className='dancerInfo'>
          <h4>Personal Information</h4>
          <section>
            {/* <h5>Address</h5> */}
            <p>123 Scarlet Way</p>
            <p>Begonia, MA 50877</p>
          </section>
          <section>
            <p>
              781-223-4567 <span>(Personal)</span>
            </p>
          </section>
        </section>

        <section className='parentInfo'>
          <h4>Parent/Account Owner</h4>
          <p>
            {dancer.parent.firstName} {dancer.parent.lastName}
          </p>

          <section>
            <section>
              <a
                className='btn-action-primary-textOnly'
                href={`mailto:${dancer.parent.email}`}
              >
                {dancer.parent.email}
              </a>
            </section>

            <section>
              <a
                className='btn-action-primary-textOnly'
                href={`tel:+1(781)752-6489`}
              >
                781-752-6489 <span>(Mobile)</span>
              </a>
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
      <div className='studioInfo'>
        <section>
          <h4>Enrollment / Registrations</h4>
          <section>
            <h5>Classes</h5>
            <ul>
              {dancer.danceClasses?.map((danceClass) => (
                <li key={danceClass.id}>{danceClass.name}</li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </DancerCard>
  )
}
