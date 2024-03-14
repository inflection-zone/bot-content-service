/* eslint-disable eol-last */
import express from 'express';
import { QnaDocumentVersionController } from './qna.document.version.controller';
// import { Loader } from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new QnaDocumentVersionController();

    router.get('/search', controller.search);
    // router.get('/search-by-date/:date', controller.getByDate);
    router.post('/', controller.create);
    router.get('/all', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/documentversions', router);
};
