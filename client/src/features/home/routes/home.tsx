import HomePage from "../pages/HomePage";

const homeRouter: {
  path: string;
  element: JSX.Element;
}[] = [{ path: "/", element: <HomePage /> }];

export default homeRouter;
