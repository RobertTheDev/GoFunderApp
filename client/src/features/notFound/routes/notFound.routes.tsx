const notFoundRouter: {
  path: string;
  element: JSX.Element;
}[] = [
  {
    path: "/*",
    element: <p>Not found</p>,
  },
];

export default notFoundRouter;
