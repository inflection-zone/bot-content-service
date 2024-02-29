/* eslint-disable no-multiple-empty-lines */
/* eslint-disable eol-last */
import express from 'express';
import { QnaDocumentController } from './qna.document.controller';
// import { Loader } from '../../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    // const authenticator = Loader.Authenticator;
    const controller = new QnaDocumentController();

    router.post('/', controller.create);
    router.get('/search', controller.getAll);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);
    router.get('/search/:name', controller.getByName);
    router.get('/search-by-source/:source', controller.getBySource);
    router.get('/search-by-strategy/:strategy', controller.getByStrategy);
    router.get('/search-by-status/:status', controller.getByStatus);
    router.get('/search-by-parentdocumentname/:parentdocumentname', controller.getByParentDocumentName);
    router.get('/search-by-parentdocumentversion/:parentdocumentversion', controller.getByParentDocumentVersion);
    router.get('/search-by-createdby/:createdby', controller.getByCreatedBy);
    router.put('/update-by-name/:name', controller.updateByName);
    router.put('/update-by-filename/:filename', controller.updateByFileName);
    router.delete('/delete-by-name/:name', controller.deleteByName);
    router.delete('/delete-by-status/:status', controller.deleteByStatus);


    app.use('/api/v1/documents', router);
};
