export class LoginUser {
  constructor(private username?:string, 
              private password?: string, 
              private email?: string) {
  }
 
  public get Username() : string {
    return this.username
  }

  public get Email() : string {
    return this.email
  }

  public get Password() : string {
    return this.password
  }

  
  public set Username(value : string) {
    this.username = value
  }

  public set Password(value : string) {
    this.password = value
  }

  public set Email(value : string) {
    this.email = value
  }
}

export class User {
  constructor(private loginUser?: LoginUser, 
              private firstName?:string, 
              private lastName?: string, 
              private age?:number) {
  }

  
  public get LoginUser() : LoginUser {
    return this.LoginUser
  }

  public get FirstName() : string {
    return this.firstName
  }

  public get LastName() : string {
    return this.lastName
  }

  public get Age() : number {
    return this.age
  }

  public set LoginUser(value: LoginUser) {
    this.loginUser = value
  }

  public set FirstName(value: string) {
    this.firstName = value
  }

  public set LastName(value: string) {
    this.lastName = value
  }

  public set Age(age: number) {
    this.age = age
  }
}