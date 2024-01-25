import AboutPage from "../pages/AboutPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";

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
