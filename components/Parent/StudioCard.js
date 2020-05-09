import { useContext } from 'react';
import Card from '../styles/Card';
import Link from 'next/link';
import { RegistrationContext } from './RegistrationContext';

const StudioCard = ({ studio, dancers }) => {
  const BrowsingContext = useContext(RegistrationContext);
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer;

  return (
    <Card>
      <>
        <h2>{studio.studioName}</h2>
        {dancers.map((dancer) => {
          dancer.allClasses = [
            ...dancer.danceClasses,
            ...dancer.customRoutines,
          ];
          const studioClasses = dancer.allClasses.filter(
            (danceClass) => danceClass.studio.id === studio.id
          );
          return (
            studioClasses.length > 0 && (
              <div key={dancer.firstName}>
                <h4>{dancer.firstName}</h4>
                {studioClasses.map((danceClass) => (
                  <p key={danceClass.id}> {danceClass.name}</p>
                ))}
              </div>
            )
          );
        })}
      </>
      <Link href={`/parent/account/browseStudio?studioId=${studio.id}`}>
        <button
          className='btn-action-primary'
          onClick={() => {
            console.log(dancers[0].id);
            setBrowsingDancer(dancers[0].id);
          }}
        >
          Manage Classes at {studio.studioName}
        </button>
      </Link>
    </Card>
  );
};

export default StudioCard;
