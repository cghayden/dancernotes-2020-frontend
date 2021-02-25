import { useContext } from 'react'
import styled from 'styled-components'
import Card from '../styles/Card'
import Link from 'next/link'
import { RegistrationContext } from './RegistrationContext'

const StudioCardStyles = styled(Card)`
  h2 {
    font-size: 1.5rem;
  }
`
const DancerListings = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  padding: 1rem 0;
`
const StudioCardLinks = styled.div``
const StudioCard = ({ studio, dancers }) => {
  const BrowsingContext = useContext(RegistrationContext)
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer

  return (
    <StudioCardStyles>
      <h2>{studio.studioName}</h2>
      <DancerListings>
        {dancers.map((dancer) => {
          const allClasses = [...dancer.danceClasses, ...dancer.customRoutines]
          const studioClasses = allClasses.filter(
            (danceClass) => danceClass.studio?.id === studio.id
          )
          return (
            studioClasses.length > 0 && (
              <div key={dancer.firstName}>
                <h4>{dancer.firstName}</h4>
                {studioClasses.map((danceClass) => (
                  <p key={danceClass.id}> {danceClass.name}</p>
                ))}
              </div>
            )
          )
        })}
      </DancerListings>
      <StudioCardLinks>
        <Link href={`/parent/browseStudio?studioId=${studio.id}`}>
          <button
            className='btn-action-primary'
            onClick={() => {
              setBrowsingDancer(dancers[0].id)
            }}
          >
            Manage Classes at {studio.studioName}
          </button>
        </Link>
        {studio.website && <a href={`//${studio.website}`}>{studio.website}</a>}
      </StudioCardLinks>
    </StudioCardStyles>
  )
}

export default StudioCard
