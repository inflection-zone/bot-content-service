/* eslint-disable eol-last */
import express from 'express';
import { QnaDocumentLibraryController } from './qna.document.library.controller';
// import { Loader } from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new QnaDocumentLibraryController();

    router.post('/', controller.create);
    router.get('/all', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/documentlibrarys', router);
};
