import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";


interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}


interface RegisterUserUseCase {

    execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

type GenerateTokenFn = (payload: Object, duration?: string) => Promise<string | null>


export class RegisterUser implements RegisterUserUseCase {


    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateToken: GenerateTokenFn = JwtAdapter.generateToken) {

    }


    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

        const user = await this.authRepository.register(registerUserDto);

        const token = await this.generateToken({ id: user.id }, '2h');

        if (!token) throw CustomError.internalServer("Error Generating TOKEN");



        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }



    }

}