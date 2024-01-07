import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Header(): ReactElement {
  return (
    <header>
      <Link to={"/"}>Home</Link>
    </header>
  );
}
