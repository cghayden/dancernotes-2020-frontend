import Link from 'next/link'
import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../components/Studio/NewStudioNav'
import PlusSvg from '../Icons/PlusSvg'
import NewParentControlPanel from './NewParentControlPanel'

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
        <NewParentControlPanel />
      </NavSection>
    </SubNav>
  )
}

export default SubNavFilter
