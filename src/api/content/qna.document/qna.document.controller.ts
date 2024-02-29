/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { QnaDocumentValidator } from './qna.document.validator';
import { BaseController } from '../../base.controller';
import { QnaDocumentGroupsService } from '../../../database/services/content/qna.document.group.service';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import {
    QnaDocumentGroupCreateModel,
    QnaDocumentGroupUpdateModel,
} from '../../../domain.types/content/qna.document.group.domain.types';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import { QnaDocumentGroup } from '../../../database/models/qna.document/qna.document.groups.model';
import { QnaDocumentService } from '../../../database/services/content/qna.document.service';
import { QnaDocumentCreateModel } from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentUpdateModel } from '../../../domain.types/content/qna.document.domain.types';
// import { validateParamAsUUID } from './base.validator.ts';

///////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentController {
    //#region member variables and constructors

    public _service: QnaDocumentService;

    _validator: QnaDocumentValidator = new QnaDocumentValidator();

    constructor() {
        // super();
        this._service = new QnaDocumentService();
    }

    //#endregion

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.getAll();
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    create = async (request: express.Request, response: express.Response) => {
        console.log('Create request call');
        try {
            // await this.authorize('QnaDocumentGroup.Create', request, response);
            var model: QnaDocumentCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add qna document!');
            }
            const message = 'Qna-Document added successfully!';
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
            const message = 'Qna-Document retrieved successfully!';
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
            const message = 'Qna-Document updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('QnaDocument.Delete', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const result = await this._service.delete(id);
            const message = 'Qna-Document deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByName = async (request: express.Request, response: express.Response) => {
        try {
            const name = request.params.name;
            const records = await this._service.getByName(name);
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getBySource = async (request: express.Request, response: express.Response) => {
        try {
            const source = request.params.source;
            const records = await this._service.getBySource(source);
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByStrategy = async (request: express.Request, response: express.Response) => {
        try {
            const strategy = request.params.strategy;
            const records = await this._service.getByStrategy(strategy);
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByStatus = async (request: express.Request, response: express.Response) => {
        try {
            const status: boolean = request.params.status === 'true';
            const records = await this._service.getByStatus(status);
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByParentDocumentName = async (request: express.Request, response: express.Response) => {
        try {
            const parentdocumentname = request.params.parentdocumentname;
            const records = await this._service.getByParentDocumentName(parentdocumentname);
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByParentDocumentVersion = async (request: express.Request, response: express.Response) => {
        try {
            const parentdocumentversion = parseInt(request.params.parentdocumentversion);
            const records = await this._service.getByParentDocumentVersion(parentdocumentversion);
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getByCreatedBy = async (request: express.Request, response: express.Response) => {
        try {
            const createdby = request.params.createdby;
            const records = await this._service.getByCreatedBy(createdby);
            const message = 'Qna-Document retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateByName = async (request: express.Request, response: express.Response) => {
        try {
            const name = request.params.name;
            var model: QnaDocumentUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.updateByName(name, model);
            const message = 'Qna-Document updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    updateByFileName = async (request: express.Request, response: express.Response) => {
        try {
            const filename = request.params.filename;
            var model: QnaDocumentUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.updateByFileName(filename, model);
            const message = 'Qna-Document updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    deleteByName = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const name = request.params.name;
            const result = await this._service.deleteByName(name);
            const message = 'Qna-Document deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    deleteByStatus = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const status: boolean = request.params.status === 'true';
            const result = await this._service.deleteByStatus(status);
            const message = 'Qna-Document deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
}
