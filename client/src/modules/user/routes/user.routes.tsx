import UserRoute from "./User";
import UsersRoute from "./Users";

const userRouter = [
  {
    path: "/users",
    element: <UsersRoute />,
  },
  {
    path: "/users/:id",
    element: <UserRoute />,
  },
];

export default userRouter;
