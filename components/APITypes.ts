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

export interface SignUpDataType {
  familyName:string
  userName:any
  userPassword:any
  firstName:string
  lastName:string
  mobile:string
  email:string
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
export type IndexPageType = 0 | 1 | -1
export interface IndexPage {
  indexPage: 0 | 1 | -1
}