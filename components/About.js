import AboutParent from './AboutParent'
import AboutStudio from './AboutStudio'
import AboutRetail from './AboutRetail'
// import {animated, motion} from 'framer-motion'

function About({ view, setView }) {
  return (
    <>
      {view === 'aboutParent' && <AboutParent />}
      {view === 'aboutStudio' && <AboutStudio />}
      {view === 'aboutRetail' && <AboutRetail />}
    </>
  )
}

export default About
