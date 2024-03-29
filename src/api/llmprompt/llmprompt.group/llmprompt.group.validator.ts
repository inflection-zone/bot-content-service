import express from 'express';
import joi from 'joi';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import { LlmPromptGroupSearchFilters } from '../../../domain.types/llm.prompt/llm.prompt.group.domain.types';
import { PromptGroup } from '../../../domain.types/promptgroup.domain.types';
import { ParsedQs } from 'qs';

export class LlmPromptGroupValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                Name        : joi.string().valid(...Object.values(PromptGroup)).optional(),
                Description : joi.string().optional(),
                PromptId    : joi.string().uuid().required(),
            });
            return await schema.validateAsync(request.body);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateGetRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                id   : joi.string().required(),
                Name : joi.string().optional(),
              
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
                Name        : joi.string().optional(),
                Description : joi.string().optional(),
               
            });
            return await schema.validateAsync(request.body);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<LlmPromptGroupSearchFilters> => {
        try {
            const schema = joi.object({
                PromptId    : joi.string().optional(),
                Name        : joi.string().optional(),
                Description : joi.string().optional(),
                
            });
               
            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query: ParsedQs): LlmPromptGroupSearchFilters => {

        var filters = {};
        var promptId = query.promptId ? query.promptId : null;
        if (promptId != null) {
            filters['PromptId'] = promptId;
        }
    
        var Name = query.Name ? query.Name : null;
        if (Name != null) {
            filters['Name'] = Name;
        }

        var Id = query.Id ? query.Id : null;
        if (Id != null) {
            filters['id'] = Id;
        }

        // var usecasetype = query.usecasetype ? query.usecasetype : null;
        // if (usecasetype != null) {
        //     filters['UseCaseType'] = usecasetype;
        // }

        // var GroupName = query.GroupName ? query.GroupName : null;
        // if (GroupName != null) {
        //     filters['GroupName'] = GroupName;
        // }
        // var itemsPerPage = query.itemsPerPage ? query.itemsPerPage : 25;
        // if (itemsPerPage != null) {
        //     filters['ItemsPerPage'] = itemsPerPage;
        // }
        // var orderBy = query.orderBy ? query.orderBy : 'CreatedAt';
        // if (orderBy != null) {
        //     filters['OrderBy'] = orderBy;
        // }
        // var order = query.order ? query.order : 'ASC';
        // if (order != null) {
        //     filters['Order'] = order;
        // }
        return filters;
    };

}
