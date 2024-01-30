import { PiHandHeartBold, PiHeartBold, PiHouseBold, PiPlusCircleBold } from 'react-icons/pi';
import { FaRegGem } from 'react-icons/fa6';

const tabBarStyle = { height: 24, width: 24 };

const tabBarLinks = [
  {
    icon: <PiHouseBold style={tabBarStyle} />,
    name: 'Home',
    path: '/'
  },
  {
    icon: <FaRegGem style={tabBarStyle} />,
    name: 'Fundraisers',
    path: '/fundraisers'
  },
  {
    icon: <PiPlusCircleBold style={tabBarStyle} />,
    name: 'Create',
    path: '/start-fundraising'
  },
  {
    icon: <PiHeartBold style={tabBarStyle} />,
    name: 'Saved',
    path: '/saved-fundraisers'
  },
  {
    icon: <PiHandHeartBold style={tabBarStyle} />,
    name: 'Donations',
    path: '/donations'
  }
];

export default tabBarLinks;
