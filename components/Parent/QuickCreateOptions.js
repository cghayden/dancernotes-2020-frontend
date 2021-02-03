import styled from 'styled-components'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import ParentQuickMenu from './ParentQuickMenu'

const OptionsLinksContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  z-index: 1;
  a {
    width: max-content;
    color: ${(props) => props.theme.blackText};
  }
`

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: #fff;
  box-shadow: ${(props) => props.theme.dropShadow1};
  border-radius: ${(props) => props.theme.borderRadius};
`

const sidebarVariants = {
  open: {
    clipPath: 'circle(800px at 89% 10%)',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: 'circle(0px at 100% 0%)',
    transition: {
      delay: 0.3,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

export default function QuickCreateOptions() {
  const [isOpen, toggleOpen] = useCycle(false, true)
  return (
    <OptionsLinksContainer
      className='hide-ltLarge'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <Background variants={sidebarVariants} />
      <AnimatePresence>{isOpen && <ParentQuickMenu />}</AnimatePresence>
      <MenuToggle
        animate={isOpen ? 'open' : 'closed'}
        toggle={() => toggleOpen()}
      />
    </OptionsLinksContainer>
  )
}

const SVGDiv = styled.div`
  svg {
    transition: all 0.2s;
  }
  svg.open {
    transform: rotate(45deg);
  }
`

const MenuToggle = ({ toggle, animate }) => (
  <button
    className='btn-icon'
    style={{
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      position: 'absolute',
      top: '9px',
      right: '8px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'transparent',
      padding: '0',
      margin: '0',
    }}
    onClick={toggle}
  >
    <SVGDiv>
      <svg
        className={animate === 'open' ? `open` : null}
        width='23'
        height='23'
        viewBox='0 0 23 23'
      >
        <path
          fill='transparent'
          strokeWidth='3'
          stroke={animate === 'open' ? `black` : `white`}
          strokeLinecap='round'
          opacity='1'
          d='M 11 .5 L 11 18.346'
        ></path>
        <path
          fill='transparent'
          strokeWidth='3'
          stroke={animate === 'open' ? `black` : `white`}
          strokeLinecap='round'
          opacity='1'
          d='M 2 9.423 L 20 9.423'
        ></path>
      </svg>
    </SVGDiv>
  </button>
)
