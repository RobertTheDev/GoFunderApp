import IRouterRoute from "../../../interfaces/RouterRoute";

const notFoundRouter: IRouterRoute[] = [
  {
    path: "/*",
    element: <p>Not found</p>,
  },
];

export default notFoundRouter;
