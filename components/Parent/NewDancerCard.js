import { useContext, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import styled from 'styled-components'
import SearchForStudio from '../SearchForStudio'
import Card from '../styles/Card'
import Edit from '../Icons/Edit'
import UpdateDancerForm from './UpdateDancerForm'
import DancerStudios from './DancerStudios'
import DancerClasses from './DancerClasses'
import { RegistrationContext } from './RegistrationContext'

const DancerCardContainer = styled(Card)`
  padding-bottom: 0;
  margin-top: 4rem;
  &:first-child {
    margin-top: 4rem;
  }
  p {
    margin-bottom: 10px;
  }
`

const DancerCardHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  h2 {
    font-size: 1.75rem;
    flex-grow: 1;
    align-self: flex-start;
  }
`
const AvatarInitials = styled.div`
  background: ${(props) => props.theme.gray4};
  border-radius: 50%;
  font-size: 2em;
  width: 2.5em;
  height: 2.5em;
  display: grid;
  place-items: center;
  color: white;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    margin: 0;
  }
`

const FlipButton = styled.button`
  padding: 0;
  margin: 0;
  box-shadow: none;
  border: none;
`

const DancerCardFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`

function DancerCard({ dancer }) {
  const [showEdit, toggleEdit] = useState(false)
  const BrowsingContext = useContext(RegistrationContext)
  const setBrowsingDancer = BrowsingContext.setBrowsingDancer
  const [showStudioSearch, setShowStudioSearch] = useState(false)
  // const [view, setView] = useState('info')
  const [newAvatar, setNewAvatar] = useState()

  function showAvatarPreview(newAvatar) {
    setNewAvatar(newAvatar)
  }

  const hasDanceClasses = dancer.danceClasses.length > 0
  const hasAvatar = dancer.avatar

  return (
    <Card>
      <DancerCardHeaderStyles>
        <AvatarInitials>
          {newAvatar ? (
            <img src={newAvatar} alt={`preview of new avatar image`} />
          ) : hasAvatar ? (
            <img src={dancer.avatar} alt={`${dancer.firstName}'s picture`} />
          ) : (
            <span>{dancer.firstName.slice(0, 2)}</span>
          )}
        </AvatarInitials>
        <h2>{dancer.firstName}</h2>
        <FlipButton onClick={(toggleEdit) => (showEdit) => !showEdit}>
          <Edit />
        </FlipButton>
      </DancerCardHeaderStyles>
      <div className='.card__section'>
        <DancerStudios studios={dancer.studios} />
        <DancerClasses danceClasses={dancer.danceClasses} />
        {/* //studios/groups // classes //requests //events */}
        {/* {dancer.studios.length > 1 ? (
          <div>
            <h3>Studios</h3>
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
              </div>
            ))}
          </div>
        ) : (
          <h3>{dancer.studios[0].studioName}</h3>
        )}*/}
      </div>
      <DancerCardFooter>
        <p>Footer</p>
        <button
          className='btn-action-primary'
          onClick={() => setShowStudioSearch(!showStudioSearch)}
        >
          Search for a Studio
        </button>
        {showStudioSearch && <SearchForStudio dancerId={dancer.id} />}
      </DancerCardFooter>
    </Card>
  )
}

export default DancerCard
export { DancerCardHeaderStyles, DancerCardContainer }

// {view === 'update' ? (
//   <UpdateDancerForm
//     dancer={dancer}
//     closeFunc={() => switchView()}
//     hasAvatar={hasAvatar}
//     showAvatarPreview={showAvatarPreview}
//   />
// )
{
  /* <p>{dancer.firstName} is not registered in any classes.</p>
<p>You can create your own routines,</p>
<p>OR</p>
<p>
  Search for a studio to request notes, signup for classes, or
  browse the studio's class offerings...
</p> */
}

// {dancer.studios.map((studio) => (
//   <Link
//     key={studio.id}
//     href={`/parent/account/browseStudio?studioId=${studio.id}`}
//   >
//     <button
//       className='btn-action-secondary'
//       onClick={() => setBrowsingDancer(dancer.id)}
//     >
//       Manage Classes at {studio.studioName}
//     </button>
//   </Link>
// ))}
