const oauthLinks: { url: string; name: string }[] = [
  {
    url: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`,
    name: "Continue with Github",
  },
  {
    url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/google/callback&response_type=token&scope=profile`,
    name: "Continue with Google",
  },
  {
    url: `https://www.amazon.com/ap/oa?client_id=${process.env.REACT_APP_AMAZON_CLIENT_ID}&scope=profile&response_type=code&redirect_uri=http://localhost:3000/auth/amazon/callback`,
    name: "Continue with Amazon",
  },
  {
    url: `https://www.facebook.com/v18.0/dialog/oauth?client_id=939909000888499&redirect_uri=http://localhost:3000/auth/facebook/callback`,
    name: "Continue with Facebook",
  },
];

export default oauthLinks;
