import express from 'express';
import { LlmPromptGroupController } from './llmprompt.group.controller';

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new LlmPromptGroupController();

    router.get('/search', controller.search);
    router.get('/name', controller.getByName);
    router.get('/records', controller.getAll);
    // router.get('/name', controller.getByName);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    
    app.use('/api/v1/llmpromptgroups', router);
};
