/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { QnaDocumentGroupsValidator } from './qna.document.group.validator';
// import { BaseController } from '../../base.controller';
import { QnaDocumentGroupsService } from '../../../database/services/content/qna.document.group.service';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { QnaDocumentGroupCreateModel, QnaDocumentGroupUpdateModel } from '../../../domain.types/content/qna.document.group.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { QnaDocumentGroup } from '../../../database/models/qna.document/qna.document.groups.model';

///////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentsGroupController {

    //#region member variables and constructors

   public _service: QnaDocumentGroupsService;

    _validator: QnaDocumentGroupsValidator = new QnaDocumentGroupsValidator();

    constructor() {
        // super();
        this._service = new QnaDocumentGroupsService();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('QnaDocumentGroup.Create', request, response);
            var model: QnaDocumentGroupCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add qna documents group!');
            }
            const message = 'QnaDocumentGroup added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('QnaDocumentGroup.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'QnaDocumentGroup retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('QnaDocumentGroup.Update', request, response);
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: QnaDocumentGroupUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'QnaDocumentGroup updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // search = async (request: express.Request, response: express.Response) => {
    //     try {
    //         // await this.authorize('QnaDocumentGroup.Search', request, response);
    //         var filters: QnaDocumentGroupSearchFilters = await this._validator.validateSearchRequest(request);
    //         const searchResults = await this._service.search(filters);
    //         const message = 'QnaDocumentGroup records retrieved successfully!';
    //         ResponseHandler.success(request, response, message, 200, searchResults);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            // await this.authorize('QnaDocumentGroup.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'QnaDocumentGroup deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
