import { Auth0Provider } from '@auth0/auth0-react';

export default (props: any) => {
  return (
    <Auth0Provider
      domain="uytran.us.auth0.com"
      clientId="n8ZreS9jANtx5zEnhyYxFjEf4S1RyKt7"
      redirectUri="http://localhost:8000"
      useRefreshTokens={true}
    >
      {props.children}
    </Auth0Provider>
  );
};
