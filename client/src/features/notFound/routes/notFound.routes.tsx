import IRouterPath from "../../../interfaces/RouterRoute";

const notFoundRouter: IRouterPath[] = [
  {
    path: "/*",
    element: <p>Not found</p>,
  },
];

export default notFoundRouter;
