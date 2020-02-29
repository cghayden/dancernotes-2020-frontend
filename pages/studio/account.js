import StudioAccountSubNav from "../../components/Studio/StudioAccountSubNav";
import SubNavMainLayout from "../../components/Studio/SubNavMainLayout";
import { useStudio } from "../../components/Studio/useStudio";
import Signout from "../../components/Signout";
import styled from "styled-components";

const SignoutDiv = styled.div`
  background: ${props => props.theme.indigo2};
  margin-top: 2rem;
  border-radius: 5px;
`;

function AccountPage() {
  const studio = useStudio();
  if (!studio) {
    return (
      <>
        <SubNavMainLayout mobileHeader="Account" page={"Account"}>
          Loading...
        </SubNavMainLayout>
      </>
    );
  }
  return (
    <>
      <SubNavMainLayout mobileHeader="Account" page={"Account"}>
        <p>{studio.studioName}</p>
        <p>{studio.email}</p>
        <SignoutDiv>
          <Signout />
        </SignoutDiv>
      </SubNavMainLayout>
    </>
  );
}

export default AccountPage;
