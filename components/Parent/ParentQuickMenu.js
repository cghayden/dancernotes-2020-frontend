import styled from 'styled-components'
import { motion } from 'framer-motion'

const MotionUl = styled(motion.ul)`
  padding: 25px;
  position: absolute;
  width: 200px;
  right: 60px;
`

const linkVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
}

const ulVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}
export default function ParentQuickMenu({ dancers }) {
  return (
    <MotionUl variants={ulVariants}>
      {dancers.length > 0 && (
        <>
          <motion.li variants={linkVariants}>
            <a href='/parent/routines/createRoutine'>Create a Routine</a>
          </motion.li>
          <motion.li variants={linkVariants}>
            <a href='/parent/events/createEvent'>Add an Event</a>
          </motion.li>
        </>
      )}
      <motion.li variants={linkVariants}>
        <a href='/parent/dancers/addDancer'>Add a Dancer</a>
      </motion.li>
    </MotionUl>
  )
}
