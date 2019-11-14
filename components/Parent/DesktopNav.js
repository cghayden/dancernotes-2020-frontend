import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
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
      <Link href="/parent/notes/routines">
        <a>Notes</a>
      </Link>
      <Link href="/parent/discover">
        <a>Discover</a>
      </Link>
      <Link href="#">
        <a>Shop</a>
      </Link>
      <Link href="/parent/account/profile">
        <a>Account</a>
      </Link>
    </DesktopNavStyles>
  );
}

export default DesktopNav;
