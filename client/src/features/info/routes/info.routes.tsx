import AboutPage from "../pages/AboutPage";
import AccessibilityStatementPage from "../pages/AccessibilityStatementPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";

const infoRouter: {
  path: string;
  element: JSX.Element;
}[] = [
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
