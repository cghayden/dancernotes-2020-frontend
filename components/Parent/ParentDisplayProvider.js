import { createContext, useState, useContext } from 'react'

const ParentDisplayContext = createContext(null)

function ParentDisplayProvider({ children }) {
  const [hiddenIds, setHiddenIds] = useState([])
  const [showControlPanel, setshowControlPanel] = useState(false)
  const [competitionMode, setcompetitionMode] = useState(false)

  function toggleId(id) {
    if (id === 'clear') {
      setHiddenIds([])
      return
    }
    if (hiddenIds.includes(id)) {
      setHiddenIds((hiddenIds) =>
        hiddenIds.filter((hiddenId) => hiddenId !== id)
      )
    } else {
      setHiddenIds([...hiddenIds, id])
    }
  }

  function toggleControlPanel() {
    setshowControlPanel(!showControlPanel)
  }
  function toggleCompetitionMode() {
    setcompetitionMode(!competitionMode)
  }

  return (
    <ParentDisplayContext.Provider
      value={{
        showControlPanel,
        toggleControlPanel,
        competitionMode,
        toggleCompetitionMode,
        hiddenIds,
        toggleId,
      }}
    >
      {children}
    </ParentDisplayContext.Provider>
  )
}

function useDisplayControls() {
  const all = useContext(ParentDisplayContext)
  return all
}

export default ParentDisplayProvider
export { ParentDisplayContext, useDisplayControls }
