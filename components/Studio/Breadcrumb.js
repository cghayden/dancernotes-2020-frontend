import { useContext } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import HomeSvg from '../Icons/HomeSvg'
import { FilterContext } from './FilterContext'
import FilterChoicesBreadcrumb from './FilterChoicesBreadcrumb'

const BreadcrumbStyles = styled(motion.div)`
  display: flex;
  align-items: center;
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
    min-width: initial;
    text-decoration: underline;
    color: ${(props) => props.theme.indigo6};
  }
`

function Breadcrumb({ page = '', selection }) {
  const { filter } = useContext(FilterContext)

  // home > page > selection or filters
  return (
    <BreadcrumbStyles layout>
      <Link href={'/studio/home'}>
        <motion.a
          layout
          className='btn-icon'
          alt='Home'
          style={{ marginBottom: '-4px' }}
        >
          <HomeSvg />
          <span className='sr-only'>Home</span>
        </motion.a>
      </Link>
      <motion.span layout>{'>'}</motion.span>
      {/* <motion.div key='page' layout> */}
      <Link href={`/studio/${page.toLowerCase()}`}>
        <a>{page}</a>
      </Link>
      {/* </motion.div> */}
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
            <motion.span layout>{'>'}</motion.span>
            <motion.p layout>{selection}</motion.p>
          </motion.div>
        ) : (
          // or
          <FilterChoicesBreadcrumb filter={filter} />
        )}
      </AnimatePresence>
    </BreadcrumbStyles>
  )
}

export default Breadcrumb
