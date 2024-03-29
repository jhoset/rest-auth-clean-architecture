import { Validators } from "../../../config";



export class LoginUserDto {

    private constructor(
        public email: string,
        public password: string,
    ) { }

    static create(obj: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = obj;

        if (!email) return ['Missing Email', undefined]
        if (!Validators.email.test(email)) return ['Invalid email', undefined];
        if (!password) return ['Missing Password', undefined];

        return [undefined, new LoginUserDto(email, password)];
    }
}