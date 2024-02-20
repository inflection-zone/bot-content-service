/* eslint-disable linebreak-style */
import express from 'express';
import { ResponseHandler } from '../../../common/handlers/response.handler';
import { BaseController } from '../../base.controller';
// import { LlmPromptsValidator } from './llm.prompts.validator';
import { LlmPromptsCreateModel } from '../../../domain.types/llm.prompt/llm.prompt.domain.types';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { LlmPromptsService } from '../../../database/services/llm.prompt/llm.prompts.service';

export class LlmPromptsController extends BaseController {

    _validator: any;

    // search(arg0: string, authenticateClient: any, authenticateUser: any, search: any) {
    //     throw new Error('Method not implemented.');
    // }

    //#region member variables and constructors

    _service: LlmPromptsService = new LlmPromptsService();
    // _validator: LlmPromptsValidator = new LlmPromptsValidator();

    constructor() {
        super();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response) => {
        try {
            await this.authorize('Badge.Create', request, response);
            var model: LlmPromptsCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add LlmPrompt!');
            }
            const message = 'LlmPrompt added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    // private _service: any;

    // getById = async (request: express.Request, response: express.Response) => {
    //     try {
    //         await this.authorize('LlmPrompt.GetById', request, response);
    //         var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
    //         const record = await this._service.getById(id);
    //         const message = 'LlmPrompt retrieved successfully!';
    //         return ResponseHandler.success(request, response, message, 200, record);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    // update = async (request: express.Request, response: express.Response) => {
    //     try {
    //         await this.authorize('LlmPrompt.Update', request, response);
    //         const id = await this._validator.validateParamAsUUID(request, 'id');
    //         var model: LlmPromptUpdateModel = await this._validator.validateUpdateRequest(request);
    //         const updatedRecord = await this._service.update(id, model);
    //         const message = 'Llm Prompt updated successfully!';
    //         ResponseHandler.success(request, response, message, 200, updatedRecord);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    // search = async (request: express.Request, response: express.Response) => {
    //     try {
    //         await this.authorize('Badge.Search', request, response);
    //         var filters: BadgeSearchFilters = await this._validator.validateSearchRequest(request);
    //         const searchResults = await this._service.search(filters);
    //         const message = 'Badge records retrieved successfully!';
    //         ResponseHandler.success(request, response, message, 200, searchResults);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    // delete = async (request: express.Request, response: express.Response): Promise < void > => {
    //     try {
    //         await this.authorize('LlmPrompt.Delete', request, response);
    //         var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
    //         const result = await this._service.delete(id);
    //         const message = 'Llm Prompt deleted successfully!';
    //         ResponseHandler.success(request, response, message, 200, result);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

}
