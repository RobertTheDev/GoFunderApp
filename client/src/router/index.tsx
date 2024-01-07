import { createBrowserRouter } from "react-router-dom";
import Charities from "./routes/charities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Charities />,
  },
]);

export default router;
