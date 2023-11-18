import * as msRestNodeAuth from '@azure/ms-rest-nodeauth';
import { authenticateAzure } from '../src/config/auth.service'; // Update with your actual service file path

jest.mock('@azure/ms-rest-nodeauth', () => ({
  loginWithServicePrincipalSecret: jest.fn(),
}));

// Arrange
const clientId = 'clientId';
const clientSecret = 'clientSecret';
const tenantId = 'tenantId';

describe('Authenticate Azure', () => {
  describe('authenticateAzure', () => {
    it('should call msRestNodeAuth.loginWithServicePrincipalSecret with the correct parameters', async () => {
      

      // Act
      await authenticateAzure();

      // Assert
      expect(msRestNodeAuth.loginWithServicePrincipalSecret).toHaveBeenCalledWith(
        clientId,
        clientSecret,
        tenantId
      );
    });

    // Add more test cases as needed to cover different scenarios or error handling
  });
});
