import { useContext, useState } from 'react'
import styled from 'styled-components'
import SearchForStudio from './SearchForStudio'
import Card from '../styles/Card'
import { RegistrationContext } from './RegistrationContext'
import Link from 'next/link'
import { AvatarStyle, InitialStyle } from '../AvatarStyle'
import DancerCardHeader from '../DancerCardHeader'
import NewSearchForStudio from './NewSearchForStudio'

// const DancerCardHeaderStyles = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-content: center;
//   h2 {
//     font-size: 1.75rem;
//     flex-grow: 1;
//     align-self: flex-start;
//   }
// `

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

const DancerCardFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`

function DancerCard({ dancer }) {
  const [showStudioSearch, setShowStudioSearch] = useState(false)
  const BrowsingContext = useContext(RegistrationContext)
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer

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
      {/* <DancerCardFooter>
        <button
          className='btn-action-primary'
          onClick={() => setShowStudioSearch(!showStudioSearch)}
        >
          Search for a Studio
        </button>
        {showStudioSearch && <NewSearchForStudio/>}
      </DancerCardFooter> */}
    </Card>
  )
}

export default DancerCard
