import { LlmPromptCreateModel, LlmPromptDto, LlmPromptUpdateModel  } from "../../../domain.types/llm.prompt/llm.prompt.domain.types";
import { LlmPromptValidator } from "././llmprompt.validator";
import { ErrorHandler } from "../../../common/handlers/error.handler";
import { ResponseHandler } from "../../../common/handlers/response.handler";
import express from 'express';
import { LlmpromptService } from "../../../database/services/llmprompt.service";
import { uuid } from "../../../domain.types/miscellaneous/system.types";

export class LlmPromptController {

    //#region member variables and constructors

    _service: LlmpromptService = new LlmpromptService();

    _validator: LlmPromptValidator = new LlmPromptValidator();

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Badge.Create', request, response);
            var model: LlmPromptCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Llm prompt!');
            }
            const message = ' Llm prompt added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        }
        catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: LlmPromptUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Llm prompt updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    
    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Badge.GetById', request, response);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            if (record === null)
            {
                const message = 'LLm prompt cannot be retrieved!';
                ErrorHandler.throwNotFoundError(message);
                // return ResponseHandler.success(request, response, message, 200, record);
            }
            else {
                const message = 'LLm prompt retrieved successfully!';
                return ResponseHandler.success(request, response, message, 200, record);
            }
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.getAll();
            const message = 'LLm prompt retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const record: LlmPromptDto = await this._service.getById(id);
            if (record == null) {
                ErrorHandler.throwNotFoundError('User with id cannot be found!');
            }
            const userDeleted = await this._service.delete(id);
            const result = {
                Deleted : userDeleted
            };
            const message = 'User deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
