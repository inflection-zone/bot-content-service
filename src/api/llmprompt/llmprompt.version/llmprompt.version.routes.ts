import express from 'express';
import { LlmPromptVersionController  } from './././llmprompt.version.controller';

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new LlmPromptVersionController();

    router.get('/records', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    
    app.use('/api/v1/llmpromptversions', router);
};
