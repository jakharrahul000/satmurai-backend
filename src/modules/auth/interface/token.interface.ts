/**
 * JWT token
 */
export interface ITokenReturnBody {
  /**
   * When the token is to expire in seconds
   */
  expires: string;
  /**
   * The Bearer token
   */
  token: string;
}
