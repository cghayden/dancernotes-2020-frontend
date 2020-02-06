import ResetParentPassword from "../../components/ResetParentPassword";
import { useRouter } from "next/router";
import {
  StyledLandingPage,
  StyledLandingContent
} from "../../components/LandingPage";
import { LandingNavStyle, AboutButton } from "../../components/LandingNav";

const resetPassword = () => {
  const router = useRouter();

  return (
    <StyledLandingPage>
      <header>
        <LandingNavStyle>
          <AboutButton className="brand" onClick={() => router.push("/")}>
            dancernotes
          </AboutButton>
        </LandingNavStyle>
      </header>

      <StyledLandingContent>
        <ResetParentPassword resetToken={router.query.resetToken} />
      </StyledLandingContent>
    </StyledLandingPage>
  );
};

export default resetPassword;
