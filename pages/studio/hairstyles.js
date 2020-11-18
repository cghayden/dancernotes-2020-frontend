import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { HAIRSTYLES_QUERY } from '../../components/Studio/Queries'
import NewStudioLayout from '../../components/Studio/NewStudioLayout'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../components/Studio/NewStudioNav'

import NewStudioSubNav from '../../components/Studio/NewStudioSubNav'
import PlusSvg from '../../components/PlusSvg'
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
      <div className='selectionWindow'>
        {choice && <HairStyleCard hairStyle={choice} />}
        {createNew && <CreateHairStyleForm />}
      </div>
    </NewStudioLayout>
  )
}

export default HairStylesPage
export { HAIRSTYLES_QUERY }
