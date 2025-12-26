import { createAuth0Client } from '@auth0/auth0-spa-js';

// It should be loaded asynchronously so it doesn't affect page load times.
const init = async () => {
  const client = await createAuth0Client({
    clientId: 'PRwd7fFYkjxfOS2B00NvgYKImsRDFTMR', //cleintID from auth0
    domain: 'dev-sql-gym.eu.auth0.com',//domain from auth0
    authorizationParams: {
      redirect_uri: 'https://www.tably.es/order-tracking', //Redirect URL after login
      audience: 'https://www.tably.es/about-us'
    },
  });


  const url = new URLSearchParams(window.location.search);
  const code = url.get('code');
  console.log(code);
  if (code) {
    await client.handleRedirectCallback();
    history.replaceState({}, document.title, window.location.origin + window.location.pathname)
  }

  const isLoggedIn = await client.isAuthenticated();

  console.log({ isLoggedIn });

  if (isLoggedIn) {
    const access_token = await client.getTokenSilently();
    const user = await client.getUser();
    console.log({ user, access_token });
  }


  window.Webflow ||= [];
  window.Webflow.push(() => {
    const loginElement = document.querySelector('#button_auth0_login');
    const logoutElement = document.querySelector('#button_auth0_logout');
    if (!loginElement || !logoutElement) return;

    loginElement.addEventListener('click', async () => {
      await client.loginWithRedirect();
    });

    logoutElement.addEventListener('click', async () => {
      await client.logout();
    });
  })

};

init();