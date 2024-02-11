import { CustomError, UserEntity } from "../../domain";


export class UserMapper {

    constructor() {

    }


    static userEntityFromObject(obj: { [key: string]: any }): UserEntity {

        const { id, _id, name, email, password, roles } = obj;

        if (!_id || !id) throw CustomError.badRequest('Missing ID');
        if (!name) throw CustomError.badRequest('Missing Email');
        if (!password) throw CustomError.badRequest('Missing Password');
        if (!roles || !roles.length) throw CustomError.badRequest('Missing Roles');


        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            roles
        );
    }

}