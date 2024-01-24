import UserPage from "../pages/User";

const userRouter = [
  {
    path: "/users/:username",
    element: <UserPage />,
  },
];

export default userRouter;
