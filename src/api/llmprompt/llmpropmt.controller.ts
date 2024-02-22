import { LlmPromptsCreateModel } from "../../domain.types/llm.prompt/llm.prompts.domain.types";
import { LlmPromptValidator } from "./llmprompt.validator";
import { ErrorHandler } from "../../common/handlers/error.handler";
import { ResponseHandler } from "../../common/handlers/response.handler";
import express from 'express';
export class LlmPromptsController {

    //#region member variables and constructors

    _service: LlmPromptsService = new LlmPromptsService();

    _validator: LlmPromptValidator = new LlmPromptValidator();

    create = async (request: express.Request, response: express.Response) => {
        try {
            // await this.authorize('Badge.Create', request, response);
            var model: LlmPromptsCreateModel = await this._validator.validateCreateRequest(request);
            const record = await this._service.create(model);
            if (record === null) {
                ErrorHandler.throwInternalServerError('Unable to add Llm prompt!');
            }
            const message = ' Llm prompt added successfully!';
            return ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };