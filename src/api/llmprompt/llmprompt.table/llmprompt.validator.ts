/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
import express from 'express';
import joi from 'joi';
import { ErrorHandler } from '../../../common/handlers/error.handler';
// import { LlmPromptsCreateModel } from "../../domain.types/llm.prompt/llm.prompts.domain.types";
import { PromptUsecase } from '../../../domain.types/usecase.domain.types';
import BaseValidator from '../../base.validator';

export class LlmPromptValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                Name              : joi.string().required(),
                Description       : joi.string().optional(),
                UseCaseType       : joi.string().valid(...Object.values(PromptUsecase)).optional(),
                ModelName         : joi.string(),
                ModelVersion      : joi.string(),
                UserId            : joi.string(),
                Temperature       : joi.number(),
                FrequencyPenality : joi.number(),
                TopP              : joi.number(),
                PresencePenalty   : joi.number(),
                IsActive          : joi.boolean(),
            });
            return await schema.validateAsync(request.body);
            
            //  return this.getValidUserCreateModel(request);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateGetRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                id : joi.string().required(),
              
            });
           return await schema.validateAsync(request.query);
            // return this.getSearchFilters(request.query);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };



    public validateUpdateRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                Name              : joi.string().required(),
                Description       : joi.string().optional(),
                UseCaseType       : joi.string().valid(...Object.values(PromptUsecase)).optional(),
                ModelName         : joi.string(),
                ModelVersion      : joi.string(),
                UserId            : joi.string(),
                Temperature       : joi.number(),
                FrequencyPenality : joi.number(),
                TopP              : joi.number(),
                PresencePenalty   : joi.number(),
                IsActive          : joi.boolean(),
            });
           return await schema.validateAsync(request.body);
            // const id = await this.validateParamAsUUID(request, 'id');
            // return await this.getValidUserUpdateModel(id, request);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}

