/**
 * Represents a user within the system.
 *
 * @interface User
 * @property {number} id - The unique identifier for the user.
 * @property {string} login - The username or login of the user.
 * @property {string} avatarUrl - The URL of the user's avatar image.
 * @property {string} htmlUrl - The URL of the user's profile page.
 * @property {string} type - Indicates the type of user (e.g., "User", "Organization").
 */
export interface User {
  id: number
  login: string,
  avatarUrl: string,
  htmlUrl: string,
  type: string
}
