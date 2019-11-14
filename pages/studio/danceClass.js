import React from "react";
import StudioDesktopNav from "../../components/Studio/StudioDesktopNav";
import StudioMobileStatusBar from "../../components/Studio/StudioMobileStatusBar";
import StudioMobileNav from "../../components/Studio/StudioMobileNav";
import ContentLayout from "../../components/ContentLayout";
import ContentHeader from "../../components/ContentHeader";
import UpdateDanceClass from "../../components/Studio/UpdateDanceClass";

export default class danceClassPage extends React.Component {
  render() {
    return (
      <>
        <StudioDesktopNav />
        <StudioMobileStatusBar />
        <StudioMobileNav />
        <ContentLayout>
          <ContentHeader page={"Update Class"} />
          <main>
            <UpdateDanceClass id={this.props.query.id} />
          </main>
        </ContentLayout>
      </>
    );
  }
}
