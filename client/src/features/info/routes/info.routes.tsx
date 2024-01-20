import AboutPage from "../pages/About";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import TermsAndConditionsPage from "../pages/TermsAndConditions";

const infoRouter = [
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditionsPage />,
  },
];

export default infoRouter;
