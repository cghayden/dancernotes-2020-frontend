import React from 'react'
import { AnimatePresence, motion, AnimateSharedLayout } from 'framer-motion'

function FilterChoicesBreadcrumb({ filter }) {
  return (
    <>
      {Object.keys(filter).length > 0 && (
        <motion.span
          layout
          style={{ display: 'flex' }}
          key={'caret'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {'>'}
        </motion.span>
      )}
      {filter?.competitiveLevel?.map((selection) => (
        <motion.div
          layout
          style={{ display: 'flex' }}
          key={selection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>{selection}</span>
        </motion.div>
      ))}
      {filter?.ageDivision?.map((selection) => (
        <motion.div
          layout
          style={{ display: 'flex' }}
          key={selection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>{selection}</span>
        </motion.div>
      ))}
      {filter?.style?.map((selection) => (
        <motion.div
          layout
          style={{ display: 'flex' }}
          key={selection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>{selection}</span>
        </motion.div>
      ))}
      {filter?.day?.map((selection) => (
        <motion.div
          layout
          style={{ display: 'flex' }}
          key={selection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>{selection}</span>
        </motion.div>
      ))}
    </>
  )
}

export default FilterChoicesBreadcrumb
