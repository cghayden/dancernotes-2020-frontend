import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'

import NewStudioLayout from '../../../components/Studio/NewStudioLayout'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../../components/Studio/NewStudioNav'
import Dancer from '../../../components/Studio/Dancer'
import { STUDIO_ALL_DANCERS_QUERY } from '../../../components/Studio/Queries'
import PlusSvg from '../../../components/PlusSvg'

export default function dancersIndex() {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)
  const [choice, setChoice] = useState()
  // const [createNew, setCreateNew] = useState(false)

  if (data) {
    return (
      <NewStudioLayout>
        <SubNav>
          <NavSection>
            <NavSectionHeading>
              <h2>Dancers</h2>
              <Link href={`/studio/dancers/#createDancer`}>
                <a>
                  <PlusSvg />
                </a>
              </Link>
            </NavSectionHeading>
            <ul>
              {data.studioDancers.map((dancer) => (
                <Link key={dancer.id} href={`/studio/dancers/${dancer.id}`}>
                  <a>
                    {dancer.firstName} {dancer.lastName}
                  </a>
                </Link>
              ))}
            </ul>
          </NavSection>
        </SubNav>
        <div className='selectionWindow hide-ltMedium'>
          <div>select a dancer</div>
        </div>
      </NewStudioLayout>
    )
  }
  return null
}
