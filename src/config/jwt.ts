import jwt from 'jsonwebtoken';
import { envs } from './envs';



const JWT_SECRET_KEY = envs.JWT_SECRET_KEY;

export class JwtAdapter {

    static async generateToken(payload: Object, duration: string = '2h'): Promise<string | null> {

        return new Promise((resolve) => {

            // TODO: Generate SECRET KEY
            jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: duration }, (err, token) => {
                if (err) {
                    return resolve(null);
                }
                resolve(token!);
            })
        })


    }


    static validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return resolve(null);
                }
                resolve(decoded as T);
            })
        })
    }





}