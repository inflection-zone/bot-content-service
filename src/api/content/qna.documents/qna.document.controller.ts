/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { QnaDocumentValidator } from '../qna.documents/qna.document.validator';
import { BaseController } from '../../base.controller';
import { QnaDocumentGroupsService } from '../../../database/services/content/qna.document.groups.service';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { QnaDocumentGroupCreateModel, QnaDocumentGroupUpdateModel } from '../../../domain.types/content/qna.document.groups.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { QnaDocumentGroups } from '../../../database/models/qna.documents/qna.document.groups.model';
import { QnaDocumentService } from '../../../database/services/content/qna.document.service';
import { QnaDocumentCreateModel } from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentUpdateModel } from '../../../domain.types/content/qna.document.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentController extends BaseController {

    //#region member variables and constructors

    _service: QnaDocumentService = new QnaDocumentService();

    _validator: QnaDocumentValidator = new QnaDocumentValidator();

    constructor() {
        super();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        console.log("Create request call");
        try {
            
            // await this.authorize('QnaDocumentGroup.Create', request, response);
            var model: QnaDocumentCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add qna document!');
            }
            const message = 'QnaDocument added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('QnaDocument.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'QnaDocument retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('QnaDocument.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: QnaDocumentUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'QnaDocument updated successfully!';
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

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            // await this.authorize('QnaDocument.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'QnaDocument deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
