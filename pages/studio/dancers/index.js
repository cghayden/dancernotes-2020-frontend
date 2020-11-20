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
import Breadcrumb from '../../../components/Studio/Breadcrumb'

export default function dancersIndex() {
  const { data, error, loading } = useQuery(STUDIO_ALL_DANCERS_QUERY)

  if (data) {
    return (
      <NewStudioLayout page={'Dancers'} createLink={'createDancer'}>
        <SubNav>
          <NavSection>
            <div className='hide-ltMedium'>
              <NavSectionHeading>
                <h2>Dancers</h2>
                <Link href={`/studio/dancers/createDancer`}>
                  <a>
                    <PlusSvg />
                  </a>
                </Link>
              </NavSectionHeading>
            </div>
            <ul>
              {data.studioDancers.map((dancer) => (
                <li>
                  <Link key={dancer.id} href={`/studio/dancers/${dancer.id}`}>
                    <a>
                      {dancer.firstName} {dancer.lastName}
                    </a>
                  </Link>
                </li>
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
