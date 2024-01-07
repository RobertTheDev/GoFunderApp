import { ReactElement } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";

export default function PageLayout(): ReactElement {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
