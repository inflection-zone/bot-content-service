/* eslint-disable eol-last */
import express from 'express';
import { QnaDocumentsGroupController } from './qna.document.group.controller';
// import { Loader } from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new QnaDocumentsGroupController();

    router.post('/', controller.create);
    router.get('/search', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    router.get('/search/:name', controller.getByName);

    app.use('/api/v1/documentgroups', router);
};
