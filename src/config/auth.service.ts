import * as msRestNodeAuth from '@azure/ms-rest-nodeauth';

export async function authenticateAzure() {
  return await msRestNodeAuth.loginWithServicePrincipalSecret(
    'clientId',
    'clientSecret',
    'tenantId'
  );
}
