export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    picUrl: string;
    role: number;
    salary: number;
    description: string;
}
export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmpassword: string;
    role: number;
    salary: number;
    description: string;
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
    user: IUser;
}

export interface ISkillFreelancer {
    skillId: number;
    freelancerId: number;
}

export interface IWork {
    id: number;
    name: string;
    price: number;
    deadline: Date;
    description: string;
    skills: number[];
    workFeedbacks: IFeedback;
    workApplys:IApply[]
}
export interface IAddWork {
    name: string;
    price: number;
    deadline: Date;
    description: string;
    skills: number[];
}

export interface ISkill {
    id: number;
    name: string;
}
export interface IAddSkill {
    name: string;
}

export interface ISkillWork {
    skillId: number;
    workId: number;
}

export interface IApply {
    freelancerId: number;
    workId: number;
    workApply: IWork;
    status:number
    active:number
}

export interface IFeedback {
    freelancerId: number;
    workId: number;
    rate: number;
    text: string;
}
