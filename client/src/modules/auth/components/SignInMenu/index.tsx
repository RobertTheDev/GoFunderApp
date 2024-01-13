import { ReactElement } from "react";
import styled from "styled-components";
import { FiMail } from "react-icons/fi";
import { PiMagicWand, PiDeviceMobile } from "react-icons/pi";

export default function SignInMenu(): ReactElement {
  return (
    <StyledMenuContainer>
      <StyledMenuHeading>Sign In</StyledMenuHeading>
      <StyledButtonsContainer>
        <StyledButton>
          <FiMail color="#111" size={24} />
          <StyledButtonTextContainer>
            <StyledButtonText> Sign Up with Email</StyledButtonText>
          </StyledButtonTextContainer>
        </StyledButton>
        <StyledButton>
          <PiDeviceMobile color="#111" size={24} />
          <StyledButtonTextContainer>
            <StyledButtonText> Sign Up with Phone Number</StyledButtonText>
          </StyledButtonTextContainer>
        </StyledButton>
        <StyledButton>
          <PiMagicWand color="#111" size={24} />
          <StyledButtonTextContainer>
            <StyledButtonText> Sign Up with Magic Link</StyledButtonText>
          </StyledButtonTextContainer>
        </StyledButton>
        <StyledButton>
          <StyledButtonIconContainer className="button-icon-image">
            <StyledButtonIconImage src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1024px-Facebook_f_logo_%282021%29.svg.png?20210818083032" />
          </StyledButtonIconContainer>
          <StyledButtonTextContainer>
            <StyledButtonText>Continue with Facebook</StyledButtonText>
          </StyledButtonTextContainer>
        </StyledButton>
        <StyledButton>
          <StyledButtonIconContainer className="button-icon-image">
            <StyledButtonIconImage src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" />
          </StyledButtonIconContainer>
          <StyledButtonTextContainer>
            <StyledButtonText>Continue with Google</StyledButtonText>
          </StyledButtonTextContainer>
        </StyledButton>
      </StyledButtonsContainer>
    </StyledMenuContainer>
  );
}

const StyledButtonIconContainer = styled.div``;

const StyledButtonIconImage = styled.img`
  height: 24px;
  width: 24px;
`;

const StyledButtonText = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const StyledButtonTextContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const StyledMenuHeading = styled.h3`
  margin: 0;
  margin-bottom: 32px;
  padding: 0;
`;

const StyledMenuContainer = styled.div`
  align-items: center;
  background-color: white;
  border: 2px solid black;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 32px;
  width: 440px;
`;

const StyledButtonsContainer = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const StyledButton = styled.button`
  align-items: center;
  background: none;
  border: 2px solid black;
  border-radius: 8px;
  display: flex;
  height: 48px;

  :hover {
    cursor: pointer;
  }
`;
