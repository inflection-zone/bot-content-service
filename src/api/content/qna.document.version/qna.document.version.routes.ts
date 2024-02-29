/* eslint-disable eol-last */
import express from 'express';
import { QnaDocumentVersionController } from './qna.document.version.controller';
// import { Loader } from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new QnaDocumentVersionController();

    router.post('/', controller.create);
    router.get('/search', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    router.get('/search-by-versionnumber/:versionnumber', controller.getByVersionNumber);
    // router.get('/search-by-date/:date', controller.getByDate);
    router.get('/search-by-fileresourceid/:fileresourceid', controller.getByFileResourceId);
    router.get('/search-by-storagekey/:storagekey', controller.getByStorageKey);
    router.get('/search-by-keywords/:keywords', controller.getByKeywords);

    app.use('/api/v1/documentversions', router);
};
