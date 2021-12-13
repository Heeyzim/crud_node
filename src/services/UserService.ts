import { getRepository } from "typeorm";
import { User } from "../models/User";
import validateUuid from 'uuid-validate';

type UserRequest = {
    name: string;
    email: string;
    password: string;
    birthDate: Date;
}

export class UserService {


    async create({ name, email, password, birthDate}: UserRequest) : Promise<User | Error> {
        const repo = getRepository(User);

        if(await repo.findOne({ email })) {
            return new Error("User already exists");
        }

        const user = repo.create({
            name,
            email,
            password,
            birthDate 
        });

        await repo.save(user);

        return user;
    }

    async getAll() {
        const repo = getRepository(User);
        
        const users = await repo.find();

        return users;
    }

    async delete(id: string) {
        if (!validateUuid(id)) {
            return new Error('Id is not a valid uuid!')
        }
        const repo = getRepository(User);

        if (!(await repo.findOne(id))) {
            return new Error('User does not exists!');
        }

        await repo.delete(id);
    }

    async user(id: string) {
        if (!validateUuid(id)) {
            return new Error('Id is not a valid uuid!')
        }
        const repo = getRepository(User);

        const user = await repo.findOne(id);

        if (!user) {
            return new Error('User does not exists!');
        }

        return user;   
    }

    async update(id: string, { name, email, password, birthDate}: UserRequest) {
        if (!validateUuid(id)) {
            return new Error('Id is not a valid uuid!')
        }
        const repo = getRepository(User);

        const user = await repo.findOne(id);

        if (!user) {
            return new Error('User does not exist!');
        }

        user.name = name;
        user.email = email;
        user.password = password;
        user.birthDate = birthDate;

        await repo.save(user);

        delete user.password;
        return user;

    }
}