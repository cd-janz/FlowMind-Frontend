export type UserWithToken = {
  token: string,
  user: BasicUser
}
export default interface BasicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  roleValue: number;
}
