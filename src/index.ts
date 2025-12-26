import { createAuth0Client } from '@auth0/auth0-spa-js';

// It should be loaded asynchronously so it doesn't affect page load times.
const init = async () => {
  const client = await createAuth0Client({
    clientId: 'PRwd7fFYkjxfOS2B00NvgYKImsRDFTMR', //cleintID from auth0
    domain: 'dev-sql-gym.eu.auth0.com',//domain from auth0
    authorizationParams: {
      redirect_uri: 'https://www.tably.es/user-account', //Redirect URL after login
    },
  });


  const url = new URLSearchParams(window.location.search);
  const code = url.get('code');
  if (code) {
    await client.handleRedirectCallback();
    history.replaceState({}, document.title, window.location.origin + window.location.pathname)
  }

  console.log(code);
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