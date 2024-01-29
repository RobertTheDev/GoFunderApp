import {
  PiHandHeartBold,
  PiHeartBold,
  PiHouseBold,
  PiPlusCircleBold,
} from "react-icons/pi";
import { FaRegGem } from "react-icons/fa6";

const tabBarStyle = { height: 24, width: 24 };

const tabBarLinks = [
  {
    icon: <PiHouseBold style={tabBarStyle} />,
    name: "Home",
    path: "/",
  },
  {
    icon: <FaRegGem style={tabBarStyle} />,
    name: "Fundraisers",
    path: "/",
  },
  {
    icon: <PiPlusCircleBold style={tabBarStyle} />,
    name: "Create",
    path: "/",
  },
  {
    icon: <PiHeartBold style={tabBarStyle} />,
    name: "Saved",
    path: "/",
  },
  {
    icon: <PiHandHeartBold style={tabBarStyle} />,
    name: "Donations",
    path: "/",
  },
];

export default tabBarLinks;
