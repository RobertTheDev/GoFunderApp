import { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../auth/contexts/AuthContext";

export default function Header(): ReactElement {
  const { user } = useContext(AuthContext);

  return (
    <StyledHeaderContainer>
      {user ? <p>{user.email}</p> : <p>No</p>}
      <Link to={"/"}>Home</Link>
      <Link to={"/charities/create-charity"}>Create Charity</Link>
    </StyledHeaderContainer>
  );
}

const StyledHeaderContainer = styled.header`
  align-items: center;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  display: flex;
  height: 80px;
  padding: 32px;
  position: sticky;
  top: 0;
  width: 100%;
`;
