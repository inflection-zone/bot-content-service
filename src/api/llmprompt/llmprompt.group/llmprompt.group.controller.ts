
import { ErrorHandler } from "../../../common/handlers/error.handler";
import { ResponseHandler } from "../../../common/handlers/response.handler";
import express from 'express';
import { uuid } from "../../../domain.types/miscellaneous/system.types";
import { LlmPromptGroupValidator } from "./llmprompt.group.validator";
import { LlmpromptGroupService } from "../../../database/services/llmprompt.group.service";
import { LlmPromptGroupCreateModel, LlmPromptGroupDto, LlmPromptGroupSearchFilters, LlmPromptGroupUpdateModel } from "../../../domain.types/llm.prompt/llm.prompt.group.domain.types";
import { LlmpromptService } from "../../../database/services/llmprompt.service";

export class LlmPromptGroupController {

    //#region member variables and constructors

    _service: LlmpromptGroupService = new LlmpromptGroupService();

    _validator: LlmPromptGroupValidator = new LlmPromptGroupValidator();

    _llmPromptRepository: LlmpromptService = new LlmpromptService();

    create = async (request: express.Request, response: express.Response) => {
        try {
            var model: LlmPromptGroupCreateModel = await this._validator.validateCreateRequest(request);
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
            var model: LlmPromptGroupUpdateModel = await this._validator.validateUpdateRequest(request);
            const updatedRecord = await this._service.update(id, model);
            const message = 'Llm prompt updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };
    
    getById = async (request: express.Request, response: express.Response) => {
        try {
            var id: uuid = await this._validator.validateParamAsUUID(request, 'id');
            const record = await this._service.getById(id);
            if (record === null)
            {
                const message = ' Prompt Group cannot be found!';
                ErrorHandler.throwNotFoundError(message);
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
            const record: LlmPromptGroupDto = await this._service.getById(id);
            if (record == null) {
                ErrorHandler.throwNotFoundError('Prompt Group with id cannot be found!');
            }
            const userDeleted = await this._service.delete(id);
            const result = {
                Deleted : userDeleted
            };
            const message = 'Prompt Group deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    search = async (request: express.Request, response: express.Response): Promise <void> => {
        try {
            // await this.authorize('User.Search', request, response);
            var filters: LlmPromptGroupSearchFilters = await this._validator.validateSearchRequest(request);
            var searchResults: LlmPromptGroupSearchFilters = await this._service.search(filters);
            const message = 'Llm prompt group records retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, searchResults);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
