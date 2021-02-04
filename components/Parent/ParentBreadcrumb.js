import { useContext } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion, AnimateSharedLayout } from 'framer-motion'
import Link from 'next/link'
import HomeSvg from '../Icons/HomeSvg'
import PlusSvg from '../Icons/PlusSvg'
// import FilterChoicesBreadcrumb from '../Studio/FilterChoicesBreadcrumb'

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

function Breadcrumb({ page = '', selection = '' }) {
  // const { filter } = useContext(FilterContext)

  // home > page > selection or filters
  return (
    <BreadcrumbStyles>
      <Link href={'/parent/routines'}>
        <motion.a
          className='btn-icon'
          alt='home'
          style={{ marginBottom: '-4px' }}
        >
          <HomeSvg />
          <span className='sr-only'>Home</span>
        </motion.a>
      </Link>
      <motion.span>{'>'}</motion.span>
      <Link href={`/parent/${page.toLowerCase()}`}>
        <a>{page}</a>
      </Link>
      <AnimatePresence>
        {/* selection? render selection name */}
        {selection && (
          <motion.div
            style={{ display: 'flex' }}
            key={'caret'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span>{'>'}</motion.span>
            <motion.p>{selection}</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </BreadcrumbStyles>
  )
}

export default Breadcrumb
