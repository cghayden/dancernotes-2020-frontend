import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function DancerStudios({ studios }) {
  const [isToggled, setToggled] = useState(false)
  return (
    <article>
      <h3 role='button' onClick={() => setToggled((isToggled) => !isToggled)}>
        Studios
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
              {studios.map((studio) => (
                <li key={studio.id}>
                  <div>
                    <p>{studio.studioName}</p>
                    <p>{studio.email}</p>
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
