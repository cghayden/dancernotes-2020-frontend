import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { DesktopNavStyles } from "../styles/NavStyles";
import Signout from "../Signout";
import RequestsCount from "./RequestsCount";
import RequestsNavLink from "./RequestsNavLink";
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

function StudioDesktopNav(props) {
  return (
    <DesktopNavStyles>
      <Link href="/studio/home">
        <a>Home</a>
      </Link>
      <Link href="classes">
        <a>Classes</a>
      </Link>
      <Link href="dancers">
        <a>Dancers</a>
      </Link>
      <Link href="makeup">
        <a>Makeup</a>
      </Link>
      <Link href="hairstyles">
        <a>Hairstyles</a>
      </Link>
      <Link href="events">
        <a>Events</a>
      </Link>
      <Link href="account">
        <a>Account</a>
      </Link>
      <RequestsNavLink />
      <Signout />
    </DesktopNavStyles>
  );
}

export default StudioDesktopNav;
