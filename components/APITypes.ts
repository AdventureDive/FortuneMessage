export interface LoginCredentials {
  userName: string,
  userPassword: string
}

export interface User {
  id: number,
  userName: string,
  firstName: string,
  lastName: string,
}

export interface ContactData {
  id: number,
  firstName: string,
  lastName: string,
  label: string,
  mobile: string,
  email: string,
  address: string,
  dob: string,
  note: string,
}