import { Validators } from "../../../config";


export class RegisterUserDto {


    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) { }


    static create(obj: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = obj;

        if (!name) return ['Missing name', undefined];
        if (!email) return ['Missing email', undefined];
        if (!Validators.email.test(email)) return ['Invalid email', undefined];
        if (!password) return ['Missing password', undefined];
        if (password && password.length < 6) return ['Password too short', undefined];


        return [undefined, new RegisterUserDto(name, email, password)];
    }

}