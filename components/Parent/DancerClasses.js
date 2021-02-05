import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function DancerStudios({ danceClasses, customRoutines }) {
  const [isToggled, setToggled] = useState(false)
  return (
    <article>
      <h3 role='button' onClick={() => setToggled((isToggled) => !isToggled)}>
        Classes
      </h3>
      <AnimatePresence>
        {isToggled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            style={{ overflow: 'hidden' }}
          >
            <ul>
              {danceClasses.map((danceClass) => (
                <li key={danceClass.id}>
                  <div>
                    <p>
                      <span>{danceClass.name}</span>
                      <span> at </span>
                      <span>{danceClass.studio?.studioName}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
