import { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'

import { AnimatePresence, motion } from 'framer-motion'

import { STUDIO_MAKEUP_QUERY } from '../../components/Studio/Queries'
import NewStudioLayout from '../../components/Studio/NewStudioLayout'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../components/Studio/NewStudioNav'
import PlusSvg from '../../components/PlusSvg'

import Error from '../../components/Error'
import Loading from '../../components/Loading'
import MakeupSetCard from '../../components/Studio/MakeupSetCard'
import CreateMakeupForm from '../../components/Studio/CreateMakeupForm'

function MakeupPage() {
  const [choice, setChoice] = useState()
  const [createNew, setCreateNew] = useState(false)

  const { data, error, loading } = useQuery(STUDIO_MAKEUP_QUERY)
  const makeupSets = data ? data.myStudio.makeupSets : []

  return (
    <NewStudioLayout>
      <SubNav>
        <NavSection>
          <NavSectionHeading>
            <h2>MakeupSets</h2>
            <button
              onClick={() => {
                setChoice(null)
                setCreateNew(true)
              }}
            >
              <PlusSvg />
            </button>
          </NavSectionHeading>
          <ul>
            {makeupSets.map((makeupSet) => (
              <button
                className={
                  choice?.id === makeupSet.id ? `activeStudioNav` : null
                }
                key={makeupSet.id}
                onClick={() => {
                  setCreateNew(false)
                  setChoice({ ...makeupSet })
                }}
              >
                {makeupSet.name}
              </button>
            ))}
          </ul>
        </NavSection>
      </SubNav>
      <AnimatePresence exitBeforeEnter>
        {choice && (
          <div className='modalSelectionWindow'>
            <motion.div
              key={choice.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MakeupSetCard makeupSet={choice} />
            </motion.div>
          </div>
        )}

        {createNew && (
          <div className='selectionWindow'>
            <motion.div
              key='create'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CreateMakeupForm />{' '}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NewStudioLayout>
  )
}

export default MakeupPage

// if (loading || error)
//   return (
//     <NoNavLayout mobileHeader="Makeup" page="Makeup">
//       {loading && <Loading />}
//       {error && <Error error={error} />}
//       <Link href="/studio/createMakeup">
//         <a>Create a Makeup Set</a>
//       </Link>
//     </NoNavLayout>
//   );

// if (data.myStudio.makeupSets.length === 0) {
//   return (
//     <NoNavLayout mobileHeader="Makeup" page="Makeup">
//       <p>You have not defined any makeup Sets...</p>
//       <Link href="/studio/createMakeup">
//         <a>Create a Makeup Set</a>
//       </Link>
//     </NoNavLayout>
//   );
// }
