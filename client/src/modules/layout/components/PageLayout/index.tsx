import { ReactElement, useContext } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AuthModal from "../../../auth/components/modal";
import { AuthContext } from "../../../auth/contexts/AuthContext/context";

export default function PageLayout(): ReactElement {
  const { authModal } = useContext(AuthContext);

  return (
    <PageLayoutContainer>
      <Header />
      <PageMainContainer>
        {authModal.active && <AuthModal />}
        <Outlet />
      </PageMainContainer>
      <Footer />
    </PageLayoutContainer>
  );
}

const PageLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const PageMainContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;
