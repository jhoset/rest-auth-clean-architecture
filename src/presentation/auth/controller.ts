import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from "../../domain"
import { error } from "console";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/dtos";
import { LoginUser } from "../../domain/use-cases";

export class AuthController {


    constructor(
        private readonly authRepository: AuthRepository
    ) { }


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" }) // Winston Logger
    }




    registerUser = (req: Request, res: Response) => {
        const [errorDto, registerUserDto] = RegisterUserDto.create(req.body)
        if (errorDto) return res.status(400).json({ error: errorDto })

        new RegisterUser(this.authRepository).execute(registerUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [errorDto, loginUserDto] = LoginUserDto.create(req.body);
        if (errorDto) return res.status(400).json({ error: errorDto });

        new LoginUser(this.authRepository).execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }


    getUsers = (req: Request, res: Response) => {
        UserModel.find()
            .then(users => res.json({
                // users,
                user: req.body.user
            }))
            .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
    }
}