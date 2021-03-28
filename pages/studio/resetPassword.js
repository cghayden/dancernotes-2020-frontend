import ResetParentPassword from '../../components/ResetParentPassword';
import { useRouter } from 'next/router';
import {
  StyledLandingPage,
  StyledLandingContent,
} from '../../components/NewLandingPage';
import { LandingNavStyle, AboutButton } from '../../components/LandingNav';
import ResetStudioPassword from '../../components/Studio/ResetStudioPassword';

const resetStudioPassword = () => {
  const router = useRouter();

  return (
    <StyledLandingPage>
      <header>
        <LandingNavStyle>
          <AboutButton className='brand' onClick={() => router.push('/')}>
            dancernotes
          </AboutButton>
        </LandingNavStyle>
      </header>

      <StyledLandingContent>
        <ResetStudioPassword resetToken={router.query.resetToken} />
      </StyledLandingContent>
    </StyledLandingPage>
  );
};

export default resetStudioPassword;
