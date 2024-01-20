import UserPage from "../pages/User";

const userRouter = [
  {
    path: "/users/:id",
    element: <UserPage />,
  },
];

export default userRouter;
