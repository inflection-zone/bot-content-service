/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
import express from 'express';
import joi from 'joi';
import { ErrorHandler } from '../../../common/handlers/error.handler';
// import { LlmPromptsCreateModel } from "../../domain.types/llm.prompt/llm.prompts.domain.types";
import { PromptUsecase } from '../../../domain.types/usecase.domain.types';
import BaseValidator from '../../base.validator';
import { LlmPromptSearchFilters } from '../../../domain.types/llm.prompt/llm.prompt.domain.types';
import { PromptGroup } from '../../../domain.types/promptgroup.domain.types';

export class LlmPromptValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                Name              : joi.string().required(),
                Description       : joi.string().optional(),
                UseCaseType       : joi.string().valid(...Object.values(PromptUsecase)).optional(),
                GroupName         : joi.string().valid(...Object.values(PromptGroup)).optional(),
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
                GroupName         : joi.string().valid(...Object.values(PromptGroup)).optional(),
                ModelName         : joi.string().optional(),
                ModelVersion      : joi.string().optional(),
                UserId            : joi.string().optional(),
                Temperature       : joi.number().optional(),
                FrequencyPenality : joi.number().optional(),
                TopP              : joi.number().optional(),
                PresencePenalty   : joi.number().optional(),
                IsActive          : joi.boolean().optional(),
            });
           return await schema.validateAsync(request.body);
            // const id = await this.validateParamAsUUID(request, 'id');
            // return await this.getValidUserUpdateModel(id, request);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<LlmPromptSearchFilters> => {
        try {
            const schema = joi.object({
                name              : joi.string().optional(),
                description       : joi.string().optional(),
                useCaseType       : joi.string().valid(...Object.values(PromptUsecase)).optional(),
                groupName         : joi.string().valid(...Object.values(PromptGroup)).optional(),
                modelName         : joi.string().optional(),
                modelVersion      : joi.string().optional(),
                userId            : joi.string().optional(),
                temperature       : joi.number().optional(),
                frequencyPenality : joi.number().optional(),
                topP              : joi.number().optional(),
                presencePenalty   : joi.number().optional(),
                isActive          : joi.boolean().optional(),
            });
               
            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query): LlmPromptSearchFilters => {

        var filters = {};

        var Name = query.Name ? query.Name : null;
        if (Name != null) {
            filters['Name'] = Name;
        }
        var UseCaseType = query.UseCaseType ? query.UseCaseType : null;
        if (UseCaseType != null) {
            filters['UseCaseType'] = UseCaseType;
        }
        var GroupName = query.GroupName ? query.GroupName : null;
        if (GroupName != null) {
            filters['GroupName'] = GroupName;
        }
        var ModelName = query.ModelName ? query.ModelName : null;
        if (ModelName != null) {
            filters['ModelName'] = ModelName;
        }
        var ModelVersion = query.ModelVersion ? query.ModelVersion : null;
        if (ModelVersion != null) {
            filters['ModelVersion'] = ModelVersion;
        }
        var UserId = query.UserId ? query.UserId : null;
        if (UserId != null) {
            filters['UserId'] = UserId;
        }
        var Temperature = query.Temperature ? query.Temperature : null;
        if (Temperature != null) {
            filters['Temperature'] = Temperature;
        }
        var FrequencyPenality = query.FrequencyPenality ? query.FrequencyPenality : null;
        if (FrequencyPenality != null) {
            filters['FrequencyPenality'] = FrequencyPenality;
        }
        var TopP = query.TopP ? query.TopP : null;
        if (TopP != null) {
            filters['TopP'] = TopP;
        }
        var PresencePenalty = query.PresencePenalty ? query.PresencePenalty : null;
        if (PresencePenalty != null) {
            filters['PresencePenalty'] = PresencePenalty;
        }
        var IsActive = query.IsActive ? query.IsActive : null;
        if (IsActive != null) {
            filters['IsActive'] = IsActive;
        }
        var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        if (itemsPerPage != null) {
            filters['ItemsPerPage'] = itemsPerPage;
        }
        var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        if (orderBy != null) {
            filters['OrderBy'] = orderBy;
        }
        var order = query.order ? query.order : 'ASC';
        if (order != null) {
            filters['Order'] = order;
        }
        return filters;
    };

}
