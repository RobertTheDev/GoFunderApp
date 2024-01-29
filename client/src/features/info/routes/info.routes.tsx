import IRouterRoute from "../../../interfaces/RouterRoute";
import AboutPage from "../pages/AboutPage";
import AccessibilityStatementPage from "../pages/AccessibilityStatementPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";

const infoRouter: IRouterRoute[] = [
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/accessibility-statement",
    element: <AccessibilityStatementPage />,
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
