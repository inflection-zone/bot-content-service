/* eslint-disable linebreak-style */
import express from 'express';
import {
    LlmPromptsController
} from './llm.prompts.controller';
import { Loader } from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new LlmPromptsController();

    router.post('/', authenticator.authenticateClient, authenticator.authenticateUser, controller.create);
    // router.get('/search', authenticator.authenticateClient, authenticator.authenticateUser, controller.search);
    // router.get('/:id', authenticator.authenticateClient, authenticator.authenticateUser, controller.getById);
    // router.put('/:id', authenticator.authenticateClient, authenticator.authenticateUser, controller.update);
    // router.delete('/:id', authenticator.authenticateClient, authenticator.authenticateUser, controller.delete);

    app.use('/api/v1/badges', router);
};
