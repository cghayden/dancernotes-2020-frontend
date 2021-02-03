import styled from 'styled-components'
import { motion } from 'framer-motion'

const MotionUl = styled(motion.ul)`
  padding: 25px;
  position: absolute;
  width: 230px;
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
export default function ParentQuickMenu() {
  return (
    <MotionUl variants={ulVariants}>
      <motion.li variants={linkVariants}>
        <a href='/parent/routines/createRoutine'>Create a Routine</a>
      </motion.li>
      <motion.li variants={linkVariants}>
        <a href='/parent/events/createEvent'>Add an Event</a>
      </motion.li>
      <motion.li variants={linkVariants}>
        <a href='/parent/createHairstyle'>Add a Hairstyle</a>
      </motion.li>
      <motion.li variants={linkVariants}>
        <a href='/parent/createMakeup'>Add a Makeup Set</a>
      </motion.li>
      <motion.li variants={linkVariants}>
        <a href='/parent/createDancer'>Add a Dancer</a>
      </motion.li>
    </MotionUl>
  )
}
