import express from 'express';
import { LlmPromptVersionController  } from './././llmprompt.version.controller';

export const register = (app: express.Application): void => {

    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new LlmPromptVersionController();

    router.get('/search', controller.search);
    router.get('/records', controller.getAll);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    // router.get('/:id', controller.getById);
    app.use('/api/v1/llmpromptversions', router);
};
