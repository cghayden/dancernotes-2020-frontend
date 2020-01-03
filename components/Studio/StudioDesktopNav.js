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
      <Link href="/studio/classes">
        <a>Classes</a>
      </Link>
      <Link href="/studio/dancers">
        <a>Dancers</a>
      </Link>
      <Link href="/studio/makeup">
        <a>Makeup</a>
      </Link>
      <Link href="/studio/hairstyles">
        <a>Hairstyles</a>
      </Link>
      <Link href="/studio/events">
        <a>Events</a>
      </Link>
      <Link href="/studio/account">
        <a>Account</a>
      </Link>
      <RequestsNavLink />
      <Signout />
    </DesktopNavStyles>
  );
}

export default StudioDesktopNav;
