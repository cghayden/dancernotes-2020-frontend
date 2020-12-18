import Link from 'next/link'

import { SubNav, NavSection, NavSectionHeading } from './NewStudioNav'
import Filter from './Filter'
import PlusSvg from '../Icons/PlusSvg'

function SubNavFilter({ page, createLink }) {
  return (
    <SubNav>
      <NavSection>
        <NavSectionHeading>
          <h2>{page}</h2>
          {createLink && (
            <Link href={createLink}>
              <a className='btn-icon'>
                <PlusSvg />
                <span className='sr-only'>{`create a new item for ${page}`}</span>
              </a>
            </Link>
          )}
        </NavSectionHeading>
        <Filter />
      </NavSection>
    </SubNav>
  )
}

export default SubNavFilter
