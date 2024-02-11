import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos";
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

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}


type GenerateTokenFn = (payload: Object, duration?: string) => Promise<string | null>


export class LoginUser implements LoginUserUseCase {


    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateToken: GenerateTokenFn = JwtAdapter.generateToken) {

    }
    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);

        const token = await this.generateToken({ id: user.id }, '2h');

        if (!token) throw CustomError.internalServer('Error generating TOKEN');

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    }

}