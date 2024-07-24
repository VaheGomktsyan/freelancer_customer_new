export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    picUrl: string;
    role:number
    salary:number
    description:string
}
export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmpassword: string;
    role:number
    salary:number
    description:string
}
export interface ILogin {
    username: string;
    password: string;
}
export interface IIsVerify {
    email: string;
    code: number;
}

export interface ICustomer {
    userId: number;
    description: string;
}

export interface IFreelancer {
    userId: number;
    salary: number;
}
