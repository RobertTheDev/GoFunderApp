import { ReactElement } from "react";
import styled from "styled-components";

export default function Footer(): ReactElement {
  return (
    <StyledFooterContainer>
      <p>Footer</p>
    </StyledFooterContainer>
  );
}

const StyledFooterContainer = styled.footer`
  align-items: center;
  background-color: whitesmoke;
  box-sizing: border-box;
  display: flex;
  height: 60px;
  padding: 32px;
  width: 100%;
`;
