import express from 'express';
import joi from 'joi';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';

export class LlmPromptVersionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                VersionNumber : joi.string().required(),
                PromptId      : joi.string().required(),
                Prompt        : joi.string().required(),
                Variables     : joi.string().required(),
                Score         : joi.number(),
                PublishedAt   : joi.date().optional(),
               
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
                VersionNumber : joi.string().optional(),
                PromptId      : joi.string().optional(),
                Prompt        : joi.string().optional(),
                Variables     : joi.string().optional(),
                Score         : joi.number(),
                PublishedAt   : joi.date().optional(),
            });
            return await schema.validateAsync(request.body);
            // const id = await this.validateParamAsUUID(request, 'id');
            // return await this.getValidUserUpdateModel(id, request);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

}

