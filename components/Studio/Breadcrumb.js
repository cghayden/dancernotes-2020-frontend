import { useContext } from 'react'

import styled from 'styled-components'
import { AnimatePresence, motion, AnimateSharedLayout } from 'framer-motion'
import Link from 'next/link'
import HomeSvg from '../Icons/HomeSvg'
import PlusSvg from '../Icons/PlusSvg'
import { FilterContext } from './FilterContext'
import FilterChoicesBreadcrumb from './FilterChoicesBreadcrumb'

const BreadcrumbStyles = styled(motion.div)`
  display: flex;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  span {
    margin: 0 0.5rem;
  }
  p {
    padding: 0 0;
    margin: 0;
  }
  a {
    padding: 0;
    margin: 0;
    text-decoration: underline;
    color: ${(props) => props.theme.indigo6};
  }
`

const CreateLinkDiv = styled.div`
  margin-left: auto;
`

function Breadcrumb({ page = '', selection, createLink }) {
  const { filter } = useContext(FilterContext)

  // home > page > selection or filters
  return (
    <BreadcrumbStyles layout>
      <Link href={'/studio/home'}>
        <a>
          <HomeSvg />
        </a>
      </Link>
      <span>{'>'}</span>
      <motion.div key='page'>
        <Link href={`/studio/${page.toLowerCase()}`}>
          <a>{page}</a>
        </Link>
      </motion.div>
      <AnimatePresence>
        {/* selection? render selection name */}

        {selection ? (
          <motion.div
            layout
            style={{ display: 'flex' }}
            key={'caret'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>{'>'}</span>
            <p>{selection}</p>
          </motion.div>
        ) : (
          // or
          <FilterChoicesBreadcrumb filter={filter} />
        )}
      </AnimatePresence>
      {createLink && (
        <CreateLinkDiv>
          <Link href={`/studio/dancers/`}>
            <a>
              <PlusSvg />
            </a>
          </Link>
        </CreateLinkDiv>
      )}
    </BreadcrumbStyles>
  )
}

export default Breadcrumb
