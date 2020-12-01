import Link from 'next/link'

import { SubNav, NavSection, NavSectionHeading } from './NewStudioNav'
import NewClassFilter from './NewClassFilter'
import PlusSvg from '../Icons/PlusSvg'

function SubNavFilter({ page, createLink }) {
  return (
    <SubNav>
      <NavSection>
        <NavSectionHeading>
          <h2>{page}</h2>
          {createLink && (
            <Link href={createLink}>
              <a>
                <PlusSvg />
              </a>
            </Link>
          )}
        </NavSectionHeading>
        <NewClassFilter />
      </NavSection>
    </SubNav>
  )
}

export default SubNavFilter
