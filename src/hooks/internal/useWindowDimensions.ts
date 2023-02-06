import { useState, useEffect } from 'react'
import { BKPT_MOBILE_END, BKPT_TABLET_END } from '../../constants'
import { WindowDimensions } from '../../constants/types'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  const { width } = windowDimensions
  const isDesktop = width > BKPT_TABLET_END
  const isTablet = width <= BKPT_TABLET_END && width > BKPT_MOBILE_END
  const isMobile = width <= BKPT_MOBILE_END

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    ...windowDimensions,
    isDesktop,
    isTablet,
    isMobile,
  }
}
