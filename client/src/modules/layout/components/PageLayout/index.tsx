import { ReactElement } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function PageLayout(): ReactElement {
  return (
    <PageLayoutContainer>
      <Header />
      <PageMainContainer>
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
