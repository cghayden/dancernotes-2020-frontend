import styled from "styled-components";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./useDimensions";

// const OptionsButton = styled.button`
//   font-size: 2rem;
//   background: ${(props) => props.theme.gray0};
//   color: ${(props) => props.theme.gray5};
//   border-radius: 50%;
//   height: 2rem;
//   width: 2rem;
//   display: flex;
//   place-items: center;
//   justify-content: center;
// `;

const OptionsLinksContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  /* background: ${(props) => props.theme.gray0}; */
  z-index: 1;

  a {
    width: max-content;
    color: ${(props) => props.theme.blackText};
  }
`;

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: #fff;
`;

const MotionUl = styled(motion.ul)`
  padding: 25px;
  position: absolute;
  width: 230px;
`;

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 89% 10%)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at 89% 10%)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function MotionOptions() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  return (
    <OptionsLinksContainer
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <Background variants={sidebar} />
      <MotionUl variants={ulVariants}>
        <motion.li variants={linkVariants}>
          <a href="/studio/createClass">Add a Dance Class</a>
        </motion.li>
        <motion.li variants={linkVariants}>
          <a href="/studio/createEvent">Add an Event</a>
        </motion.li>
        <motion.li variants={linkVariants}>
          <a href="/studio/createHairstyle">Add a Hairstyle</a>
        </motion.li>
        <motion.li variants={linkVariants}>
          <a href="/studio/createMakeup">Add a Makeup Set</a>
        </motion.li>
        <motion.li variants={linkVariants}>
          <a href="/studio/#createDancer">Add a Dancer</a>
        </motion.li>
      </MotionUl>
      <MenuToggle
        animate={isOpen ? "open" : "closed"}
        toggle={() => toggleOpen()}
      />
    </OptionsLinksContainer>
  );
}

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const SVGDiv = styled.div`
  svg {
    transition: all 0.2s;
  }
  svg.open {
    transform: rotate(45deg);
  }
`;

const MenuToggle = ({ toggle, animate }) => (
  <button
    style={{
      outline: "none",
      border: "none",
      cursor: "pointer",
      userSelect: "none",
      position: "absolute",
      top: "9px",
      right: "8px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "transparent",
      padding: "0",
      margin: "0",
    }}
    onClick={toggle}
  >
    <SVGDiv>
      <svg
        className={animate === "open" ? `open` : null}
        width="23"
        height="23"
        viewBox="0 0 23 23"
      >
        <path
          fill="transparent"
          strokeWidth="3"
          stroke="hsl(0, 0%, 18%)"
          strokeLinecap="round"
          opacity="1"
          d="M 11 .5 L 11 18.346"
        ></path>
        <path
          fill="transparent"
          strokeWidth="3"
          stroke="hsl(0, 0%, 18%)"
          strokeLinecap="round"
          opacity="1"
          d="M 2 9.423 L 20 9.423"
        ></path>
      </svg>
    </SVGDiv>
  </button>
);

const linkVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const ulVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

{
  /* <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      /> */
}
