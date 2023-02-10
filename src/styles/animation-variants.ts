export const variants = {
  slideA: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: '10px',
    },
    exit: {
      opacity: 0,
      x: '0px',
    },
  },
  slideB: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: '-10px',
    },
    exit: {
      opacity: 0,
      x: '0px',
    },
  },
  slideRight: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      x: '10px',
    },
    exit: {
      opacity: 0,
      x: '20px',
    },
  },
  drop: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      y: '10px',
    },
    exit: {
      opacity: 0,
      y: '-10px',
    },
  },
  zoom: {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
    },
  },
}
