import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { HAIRSTYLES_QUERY } from '../../components/Studio/Queries'
import NewStudioLayout from '../../components/Studio/NewStudioLayout'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../components/Studio/NewStudioNav'

import NewStudioSubNav from '../../components/Studio/NewStudioSubNav'
import PlusSvg from '../../components/Icons/PlusSvg'
import Error from '../../components/Error'
import HairStyleCard from '../../components/Studio/HairStyleCard'
import CreateHairStyleForm from '../../components/Studio/CreateHairStyleForm'

// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~;

function HairStylesPage() {
  const { data, error, loading } = useQuery(HAIRSTYLES_QUERY)
  // console.log('data', data?.studioHairStyles)
  const [choice, setChoice] = useState()
  const [createNew, setCreateNew] = useState(false)

  const subnavOptions = data?.studioHairStyles.map((hairStyle) => {
    return { id: hairStyle.id, text: hairStyle.name, data: hairStyle }
  })

  // console.log('subnavOptions', subnavOptions)

  return (
    <NewStudioLayout>
      <div>
        <NewStudioSubNav
          page={'Hairstyles'}
          choice={choice}
          setChoice={setChoice}
          setCreateNew={setCreateNew}
          options={subnavOptions}
        />
      </div>
      <AnimatePresence exitBeforeEnter>
        {choice && (
          <div className='modalSelectionWindow'>
            <motion.div
              key={choice.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HairStyleCard hairStyle={choice} />
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
              <CreateHairStyleForm />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NewStudioLayout>
  )
}

export default HairStylesPage
export { HAIRSTYLES_QUERY }
