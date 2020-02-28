import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

import StyledLink from "../StyledLink";
import { DesktopNavStyles } from "../styles/NavStyles";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

function DesktopNav() {
  return (
    <DesktopNavStyles>
      <StyledLink activeClassName="active" href="/parent/notes/routines">
        <a>Notes</a>
      </StyledLink>
      <Link href="/parent/discover">
        <a>Discover</a>
      </Link>
      <Link href="/parent/shop">
        <a>Shop</a>
      </Link>
      <Link href="/parent/account/profile">
        <a>Account</a>
      </Link>
    </DesktopNavStyles>
  );
}

export default DesktopNav;
