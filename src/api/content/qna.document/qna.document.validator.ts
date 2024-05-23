import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    QnaDocumentSearchFilters,
    QnaDocumentUpdateModel,
} from '../../../domain.types/content/qna.document.domain.types';
import { ChunkingStrategy } from '../../../domain.types/chunking.strategy.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request) => {
        try {
            const schema = joi.object({
                Name                  : joi.string().required(),
                Description           : joi.string(),
                FileName              : joi.string().required(),
                Source                : joi.string().required(),
                ParentDocument        : joi.string().required(),
                ParentDocumentVersion : joi.string(),
                ChunkingStrategy      : joi
                    .string()
                    .valid(...Object.values(ChunkingStrategy))
                    .required(),
                ChunkingLength : joi.number().required(),
                ChunkOverlap   : joi.number().required(),
                Splitter       : joi.string().required(),
                IsActive       : joi.boolean().required(),
                CreatedBy      : joi.string().required(),
                ResourceId     : joi.string().uuid().required(),
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

    public validateUpdateRequest = async (request: express.Request): Promise<QnaDocumentUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                Name                  : joi.string().optional(),
                Description           : joi.string().optional(),
                FileName              : joi.string().optional(),
                Source                : joi.string().optional(),
                ParentDocument        : joi.string().optional(),
                ParentDocumentVersion : joi.string().optional(),
                ChunkingStrategy      : joi
                    .string()
                    .valid(...Object.values(ChunkingStrategy))
                    .optional(),
                ChunkingLength : joi.number().optional(),
                ChunkOverlap   : joi.number().optional(),
                Splitter       : joi.string().optional(),
                IsActive       : joi.boolean().optional(),
                CreatedBy      : joi.string().optional(),
                ResourceId     : joi.string().uuid().optional(),
            });
            return await schema.validateAsync(request.body);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<QnaDocumentSearchFilters> => {
        try {
            const schema = joi.object({
                name                  : joi.string().optional(),
                description           : joi.string().optional(),
                fileName              : joi.string().optional(),
                source                : joi.string().optional(),
                parentDocument        : joi.string().optional(),
                parentDocumentVersion : joi.string().optional(),
                chunkingStrategy      : joi
                    .string()
                    .valid(...Object.values(ChunkingStrategy))
                    .optional(),
                chunkingLength : joi.number().optional(),
                chunkOverlap   : joi.number().optional(),
                splitter       : joi.number().optional(),
                isActive       : joi.boolean().optional(),
                createdBy      : joi.string().optional(),
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query): QnaDocumentSearchFilters => {
        var filters = {};

        var name = query.name ? query.name : null;
        if (name != null) {
            filters['name'] = name;
        }
        var description = query.description ? query.description : null;
        if (description != null) {
            filters['description'] = description;
        }
        var fileName = query.fileName ? query.fileName : null;
        if (fileName != null) {
            filters['fileName'] = fileName;
        }
        var source = query.source ? query.source : null;
        if (source != null) {
            filters['source'] = source;
        }
        var parentDocument = query.parentDocument ? query.parentDocument : null;
        if (parentDocument != null) {
            filters['parentDocument'] = parentDocument;
        }
        var parentDocumentVersion = query.parentDocumentVersion ? query.parentDocumentVersion : null;
        if (parentDocumentVersion != null) {
            filters['parentDocumentVersion'] = parentDocumentVersion;
        }
        var chunkingStrategy = query.chunkingStrategy ? query.chunkingStrategy : null;
        if (chunkingStrategy != null) {
            filters['chunkingStrategy'] = chunkingStrategy;
        }
        var chunkingLength = query.chunkingLength ? query.chunkingLength : null;
        if (chunkingLength != null) {
            filters['chunkingLength'] = chunkingLength;
        }
        var chunkOverlap = query.chunkOverlap ? query.chunkOverlap : null;
        if (chunkOverlap != null) {
            filters['chunkOverlap'] = chunkOverlap;
        }
        var splitter = query.splitter ? query.splitter : null;
        if (splitter != null) {
            filters['splitter'] = splitter;
        }
        var isActive = query.isActive ? query.isActive : null;
        if (isActive != null) {
            filters['isActive'] = isActive;
        }
        var createdBy = query.createdBy ? query.createdBy : null;
        if (createdBy != null) {
            filters['createdBy'] = createdBy;
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
