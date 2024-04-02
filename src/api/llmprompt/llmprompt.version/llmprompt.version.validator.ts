import express from 'express';
import joi from 'joi';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import { LlmPromptVersionSearchFilters } from '../../../domain.types/llm.prompt/llm.prompt.version.domain.types';

export class LlmPromptVersionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                VersionNumber : joi.string().required(),
                PromptId      : joi.string().required(),
                Prompt        : joi.string().required(),
                Variables     : joi.array().items(joi.string().required()),
                Score         : joi.number(),
                PublishedAt   : joi.date().optional(),
               
            });
            return await schema.validateAsync(request.body);
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
                Variables     : joi.array().items(joi.string().optional()),
                Score         : joi.number(),
                PublishedAt   : joi.date().optional(),
            });
            return await schema.validateAsync(request.body);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<LlmPromptVersionSearchFilters> => {
        try {
            const schema = joi.object({
                VersionNumber : joi.string().optional(),
                PromptId      : joi.string().optional(),
                Prompt        : joi.string().optional(),
                Variables     : joi.string().optional(),
                Score         : joi.string().optional(),
                PublishedAt   : joi.date().optional(),
            });
            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query): LlmPromptVersionSearchFilters => {

        var filters = {};

        var VersionNumber = query.VersionNumber ? query.VersionNumber : null;
        if (VersionNumber != null) {
            filters['VersionNumber'] = VersionNumber;
        }
        var PromptId  = query.PromptId  ? query.PromptId  : null;
        if (PromptId  != null) {
            filters['PromptId '] = PromptId ;
        }
        var Prompt = query.Prompt ? query.Prompt : null;
        if (Prompt != null) {
            filters['Prompt'] = Prompt;
        }
        var Variables = query.Variables ? query.Variables : null;
        if (Variables != null) {
            filters['Variables'] = Variables;
        }
        var Score = query.Score ? query.Score : null;
        if (Score != null) {
            filters['Score'] = Score;
        }
        var PublishedAt = query.PublishedAt ? query.PublishedAt : null;
        if (PublishedAt != null) {
            filters['PublishedAt'] = PublishedAt;
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

