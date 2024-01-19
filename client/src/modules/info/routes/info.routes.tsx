import AboutView from "../views/About";
import PrivacyPolicyView from "../views/PrivacyPolicy";
import TermsAndConditionsView from "../views/TermsAndConditions";

const infoRouter = [
  {
    path: "/about",
    element: <AboutView />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyView />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditionsView />,
  },
];

export default infoRouter;
