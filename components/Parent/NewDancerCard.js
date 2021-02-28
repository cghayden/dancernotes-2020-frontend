import styled from 'styled-components'
import Card from '../styles/Card'
import Link from 'next/link'
import DancerCardHeader from '../DancerCardHeader'
import NewSearchForStudio from './NewSearchForStudio'

const ClassesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  padding: 1rem 0;
`
const NoClassesContainer = styled.div`
  padding: 1rem 0;
  input {
    margin: 1rem 0;
    border: 1 px solid gray;
    border-radius: 5px;
  }
`

function DancerCard({ dancer }) {
  if (!dancer.danceClasses.length) {
    return (
      <Card>
        <DancerCardHeader dancer={dancer} showEditLink={true} />
        <NoClassesContainer className='.card__section'>
          <p>{dancer.firstName} is not enrolled in any dances or classes</p>
          <p>Search below to find a studio to browse or enroll in classes</p>
          <NewSearchForStudio />
        </NoClassesContainer>
      </Card>
    )
  }

  return (
    <Card>
      <DancerCardHeader dancer={dancer} showEditLink={true} />
      <ClassesContainer className='.card__section'>
        {dancer.studios.map((studio) => (
          <div key={studio.id}>
            <h4>Classes at {studio.studioName}</h4>
            <ul>
              {dancer.danceClasses.map((dance) => {
                if (dance.studio.id === studio.id) {
                  return <li key={dance.id}>{dance.name}</li>
                }
              })}
            </ul>
            <Link href={`/parent/browseStudio?studioId=${studio.id}`}>
              <button
                className='btn-action-primary-textOnly'
                onClick={() => {
                  setBrowsingDancer(dancer.id)
                }}
              >
                Manage Classes at {studio.studioName}
              </button>
            </Link>
          </div>
        ))}
      </ClassesContainer>
    </Card>
  )
}

export default DancerCard
