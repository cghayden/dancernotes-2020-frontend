import { useContext, useState } from 'react'
import styled from 'styled-components'
import SearchForStudio from './SearchForStudio'
import Card from '../styles/Card'
import { RegistrationContext } from './RegistrationContext'
import Link from 'next/link'
import { AvatarStyle, InitialStyle } from '../AvatarStyle'
import DancerCardHeader from '../DancerCardHeader'

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

const DancerCardFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`

function DancerCard({ dancer }) {
  const [showStudioSearch, setShowStudioSearch] = useState(false)
  const BrowsingContext = useContext(RegistrationContext)
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer

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
        {showStudioSearch && <SearchForStudio dancerId={dancer.id} />}
      </DancerCardFooter> */}
    </Card>
  )
}

export default DancerCard
// const DancerCardContainer = styled(Card)`
//   padding-bottom: 0;
//   margin-top: 4rem;
//   &:first-child {
//     margin-top: 4rem;
//   }
//   p {
//     margin-bottom: 10px;
//   }
// `
// const Avatar = styled.img`
//   width: 40px;
//   height: 40px;
//   width: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
//   height: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
//   filter: ${(props) => (props.isDancerHidden ? `opacity(.4)` : `none`)};
//   border-radius: 25px;
//   margin: 0 0.25rem;
//   object-fit: cover;
//   overflow: hidden;
// `

// const Initial = styled.div`
//   /* width: 40px;
//   height: 40px; */
//   width: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
//   height: ${(props) => (props.isDancerHidden ? `30px` : `40px`)};
//   border-radius: 25px;
//   margin: 0 0.25rem;
//   display: grid;
//   place-items: center;
//   font-size: ${(props) => (props.isDancerHidden ? `1.4em` : `1.6em`)};
//   background-color: ${(props) =>
//     props.isDancerHidden ? props.theme.gray2 : props.theme.green7};
//   color: ${(props) =>
//     props.isDancerHidden ? props.theme.gray4 : props.theme.green0};
// `
