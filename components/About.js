import AboutParent from './AboutParent'
import AboutStudio from './AboutStudio'
import AboutRetail from './AboutRetail'
// import {animated, motion} from 'framer-motion'

function About({ view, setView }) {
  return (
    <>
      {view === 'aboutParent' && <AboutParent setView={setView} />}
      {view === 'aboutStudio' && <AboutStudio setView={setView} />}
      {view === 'aboutRetail' && <AboutRetail />}
    </>
  )
}

export default About
