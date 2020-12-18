import MobileStatusBar from './Parent/MobileStatusBar'
import MobileNav from './Parent/MobileNav'
import DesktopNav from './Parent/DesktopNav'
import ContentHeader from './ContentHeader'
import styled from 'styled-components'

const MainStyle = styled.main`
  margin-top: ${(props) => props.theme.mobileMainTop};
  height: 100vh;
  overflow-y: scroll;
  @media (min-width: ${(props) => props.theme.largeScreen}) {
    /* left margin to give room for subnav */
    margin-left: ${(props) => props.theme.sidebarWidth};
    /* right margin to give room for control panel */
    margin-right: ${(props) => props.theme.controlPanelWidth};
    margin-top: ${(props) => props.theme.navHeight};
  }
`

//This component sets the layout when there is a control panel for the page. The control panel is offscreen on mobile, and the text for the button that toggles the offscreen panel must be passed as 'offscreenToggler' prop (Sting) from the page that needs it.  offscreenToggler must then be passed to MobileStatusBar

// ContentHeader recieves mobile prop to signal that it must remain on the page in the mobile layout.
// this is necessary because the pageAction needs to be displayed in the main content area because the offscreen toggler is occupying the place of the action button in the mobileNav.
const SubNavMainLayout = ({
  offscreenToggler = null,
  children,
  page = '',
  mobileHeader = '',
  pageAction = null,
}) => {
  return (
    <>
      <MobileStatusBar
        offscreenToggler={offscreenToggler}
        mobileHeader={mobileHeader}
        pageAction={pageAction}
      />
      <MobileNav />
      <DesktopNav />
      <MainStyle>
        <ContentHeader mobile page={page} pageAction={pageAction} />
        {children}
      </MainStyle>
    </>
  )
}

export default SubNavMainLayout
