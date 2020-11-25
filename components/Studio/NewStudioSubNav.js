import {
  SubNav,
  NavSection,
  NavSectionHeading,
} from '../../components/Studio/NewStudioNav'
import PlusSvg from '../Icons/PlusSvg'

export default function NewStudioSubNav({
  page,
  choice,
  setChoice,
  setCreateNew,
  options,
}) {
  return (
    <SubNav>
      <NavSection>
        <NavSectionHeading>
          <h2>{page}</h2>
          <button
            onClick={() => {
              setChoice(null)
              setCreateNew(true)
            }}
          >
            <PlusSvg />
          </button>
        </NavSectionHeading>
        {options && (
          <ul>
            {options.map((option) => (
              <button
                className={choice?.id === option.id ? `activeStudioNav` : null}
                key={option.id}
                onClick={() => {
                  setCreateNew(false)
                  setChoice(option.data)
                }}
              >
                {option.text}
              </button>
            ))}
          </ul>
        )}
      </NavSection>
    </SubNav>
  )
}
