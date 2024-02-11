import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos";
import { UserMapper } from "../mappers/user.mapper";


type HashFn = (password: string) => string;
type CompareFn = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFn = BcryptAdapter.hash,
        private readonly comparePassword: CompareFn = BcryptAdapter.compare
    ) {

    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            const userDb = await UserModel.findOne({ email: email })
            if (!userDb) throw CustomError.unauthorized('User or Password Incorrect');

            const match = this.comparePassword(password, userDb.password);
            if (!match) throw CustomError.unauthorized('User or Password Incorrect');

            return UserMapper.userEntityFromObject(userDb);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        const { name, email, password } = registerUserDto;
        try {

            //1. Verify if email already exists
            const exists = await UserModel.findOne({ email: email });
            if (exists) throw CustomError.badRequest('User email already exists!')

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password)
            })

            //2.- Password Hashing
            await user.save();
            //3.- Map response to Entity

            return UserMapper.userEntityFromObject(user)


        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }


    }

}