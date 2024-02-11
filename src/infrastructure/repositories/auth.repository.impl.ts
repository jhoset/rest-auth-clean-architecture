import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(private readonly authDataSource: AuthDatasource) {

    }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto)
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto);
    }

}