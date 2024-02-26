/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { QnaDocumentVersionValidator } from './qna.document.version.validator';
import { BaseController } from '../../base.controller';
import { ErrorHandler } from '../../../common/handlers/error.handler';

import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { QnaDocumentVersion } from '../../../database/models/qna.document/qna.document.version.model';
import { QnaDocumentVersionService } from '../../../database/services/content/qna.document.version.service';
import { QnaDocumentVersionCreateModel } from '../../../domain.types/content/qna.document.version.domain.types';
import { QnaDocumentVersionUpdateModel } from '../../../domain.types/content/qna.document.version.domain.types';
// import { validateParamAsUUID } from './base.validator.ts';

///////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentVersionController {
    //#region member variables and constructors

    public _service: QnaDocumentVersionService;

    _validator: QnaDocumentVersionValidator = new QnaDocumentVersionValidator();

    constructor() {
        // super();
        this._service = new QnaDocumentVersionService();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        console.log('Create request call');
        try {
            // await this.authorize('QnaDocumentVersion.Create', request, response);
            var model: QnaDocumentVersionCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add qna document version!');
            }
            const message = 'QnaDocumentVersion added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('QnaDocumentVersion.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'QnaDocumentVersion retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('QnaDocumentVersion.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: QnaDocumentVersionUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'QnaDocumentVersion updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // search = async (request: express.Request, response: express.Response) => {
    //     try {
    //         // await this.authorize('QnaDocumentGroup.Search', request, response);
    //         // var filters: QnaDocumentSearchFilters = await this._validator.validateSearchRequest(request);
    //         const searchResults = await this._service.search(filters);
    //         const message = 'QnaDocument records retrieved successfully!';
    //         ResponseHandler.success(request, response, message, 200, searchResults);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('QnaDocument.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'QnaDocumentVersion deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
