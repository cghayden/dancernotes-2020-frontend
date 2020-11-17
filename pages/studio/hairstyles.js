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

import PlusSvg from '../../components/PlusSvg'
import Error from '../../components/Error'
import HairStyleCard from '../../components/Studio/HairStyleCard'
import CreateHairStyleForm from '../../components/Studio/CreateHairStyleForm'

// ~~~~~~~~~~~~~~~~~~~ CODE ~~~~~~~~~~~~~~~~~~~~~~;

function HairStylesPage() {
  const { data, error, loading } = useQuery(HAIRSTYLES_QUERY)
  const [choice, setChoice] = useState()
  const [createNew, setCreateNew] = useState(false)
  return (
    <NewStudioLayout>
      <SubNav className='hide-ltMedium'>
        <NavSection>
          <NavSectionHeading>
            <h2>Hairstyles</h2>
            <button
              onClick={() => {
                setChoice(null)
                setCreateNew(true)
              }}
            >
              <PlusSvg />
            </button>
          </NavSectionHeading>
          {data && (
            <ul>
              {data.studioHairStyles.map((hairstyle) => (
                <button
                  className={
                    choice?.id === hairstyle.id ? `activeStudioNav` : null
                  }
                  key={hairstyle.id}
                  onClick={() => {
                    setCreateNew(false)
                    setChoice({ ...hairstyle })
                  }}
                >
                  {hairstyle.name}
                </button>
              ))}
            </ul>
          )}
        </NavSection>
      </SubNav>
      <div className='selectionWindow'>
        {choice && <HairStyleCard hairStyle={choice} />}
        {createNew && <CreateHairStyleForm />}
      </div>
    </NewStudioLayout>
  )
}

export default HairStylesPage
export { HAIRSTYLES_QUERY }
