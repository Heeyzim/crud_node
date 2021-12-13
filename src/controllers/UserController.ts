import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import * as bcrypt from "bcrypt";

export class UserController {
    async create(request: Request, response: Response) {

        const { name, email, password, birthDate } = request.body;

        const service = new UserService();
        const newPassword = await bcrypt.hash(password, 8)
        const result = await service.create({name, email, password: newPassword, birthDate});

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        delete result.password;

        return response.json(result);

    }

    async getAll(request: Request, response: Response) {
        const service = new UserService();

        const result = await service.getAll();

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result);
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const service = await new UserService();

        const result = await service.delete(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.status(204).end();
    }

    async user(request: Request, response: Response) {
        const { id } = request.params;

        const service = new UserService();

        const result = await service.user(id);
        
        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result);

    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const { name, email, password, birthDate } = request.body;

        const service = new UserService();
        const newPassword = await bcrypt.hash(password, 8)
        const result = await service.update(id, { name, email, password: newPassword, birthDate });
        
        if(result instanceof Error) {
            return response.status(400).json(result.message)
        }

        return response.json(result);

    }
    
}