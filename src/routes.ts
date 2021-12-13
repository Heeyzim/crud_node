import { Router } from "express";
import { UserController } from "./controllers/UserController";


const routes = Router();

routes.post('/users', new UserController().create);
routes.get('/users', new UserController().getAll)
routes.get('/users/:id', new UserController().user)
routes.put('/users/:id', new UserController().update)
routes.delete('/users/:id', new UserController().delete)

export { routes }