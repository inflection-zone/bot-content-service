import { ErrorHandler } from "../../../common/handlers/error.handler";
import { ResponseHandler } from "../../../common/handlers/response.handler";
import express from 'express';
import { uuid } from "../../../domain.types/miscellaneous/system.types";
import { LlmPromptVersionCreateModel, LlmPromptVersionDto, LlmPromptVersionSearchFilters, LlmPromptVersionUpdateModel } from "../../../domain.types/llm.prompt/llm.prompt.version.domain.types";
import { LlmPromptVersionValidator } from "./llmprompt.version.validator";
import { LlmpromptVersionService } from "../../../database/services/llmpromptversion.service";

export class LlmPromptVersionController {

    //#region member variables and constructors

    _service: LlmpromptVersionService = new LlmpromptVersionService();

    _validator: LlmPromptVersionValidator = new LlmPromptVersionValidator();

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: LlmPromptVersionCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add LLm prompt version!');
            }
            const message = ' LLm prompt version added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        }
        catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            var model: LlmPromptVersionUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Llm prompt version updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Participant.GetById', request, response, false);
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            const message = 'prompt version retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    
    // getById = async (request: express.Request, response: express.Response) => {
    //     try {
    //         var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
    //         const record = await this._service.getById(id);
    //         if (record === null)
    //         {
    //             const message = ' Prompt version id cannot be found!';
    //             ErrorHandler.throwNotFoundError(message);
    //         }
    //         else {
    //             const message = 'LLm prompt version retrieved successfully!';
    //             return ResponseHandler.success(request, response, message, 200, record);
    //         }
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

    getByPromptId = async (request: express.Request, response: express.Response) => {
        try {
            var promptId: uuid = await this._validator.validateParamAsUUID(request, 'promptId');
            const records = await this._service.getByPromptId(promptId);
            const message = 'Prompt  retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, records);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };


    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const record = await this._service.getAll();
            const message = 'LLm prompt version retrieved successfully!';
            return ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response) => {
        try {
            const id = await this._validator.validateParamAsUUID(request, 'id');
            const record: LlmPromptVersionDto = await this._service.getById(id);
            if (record == null) {
                ErrorHandler.throwNotFoundError('LLm version id cannot be found!');
            }
            const userDeleted = await this._service.delete(id);
            const result = {
                Deleted : userDeleted
            };
            const message = 'LLm prompt version deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response) => {
        try {
           
            var filters: LlmPromptVersionSearchFilters = await this._validator.validateSearchRequest(request);
            const searchResults = await this._service.search(filters);
            const message = 'Llm prompt records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
