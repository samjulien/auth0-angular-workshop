import { domain, clientId, audience, apiUrl } from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    audience,
  },
  dev: {
    apiUrl,
  },
};
