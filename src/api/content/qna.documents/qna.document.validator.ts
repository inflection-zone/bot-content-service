/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
import joi from 'joi';
import express from 'express';

import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';

// import { QnaDocuments } from 'src/database/models/qna.documents/qna.documents.model';

import { QnaDocumentCreateModel, QnaDocumentUpdateModel } from '../../../domain.types/content/qna.document.domain.types';
import { integer } from '../../../../dist/src/domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<QnaDocumentCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string(),
                Description: joi.string(),
                Filename: joi.string(),
                Source: joi.string(),
                ParentDocument: joi.string(),
                ParentDocumentVersion: joi.number(),
                ChunkingStrategy: joi.string(),
                ChunkingLenght: joi.number(),
                ChunkOverlap: joi.number(),
                Splitter: joi.string(),
                IsActive: joi.string(),
                CreatedBy: joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                Filename: request.body.Filename,
                Source: request.body.Source,
                ParentDocument: request.body.ParentDocument,
                ParentDocumentVersion: request.body.ParentDocumentVersion,
                ChunkingStrategy: request.body.ChunkingStrategy,
                ChunkingLenght: request.body.ChunkingLenght,
                ChunkOverlap: request.body.ChunkOverlap,
                Splitter: request.body.Splitter,
                IsActive: request.body.IsActive,
                CreatedBy: request.body.CreatedBy,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<QnaDocumentUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                Name: joi.string(),
                Description: joi.string(),
                Filename: joi.string(),
                Source: joi.string(),
                ParentDocument: joi.string(),
                ParentDocumentVersion: joi.number(),
                ChunkingStrategy: joi.string(),
                ChunkingLenght: joi.number(),
                ChunkOverlap: joi.number(),
                Splitter: joi.string(),
                IsActive: joi.string(),
                CreatedBy: joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name ?? null,
                Description: request.body.Description ?? null,
                Filename: request.body.Filename ?? null,
                Source: request.body.Source ?? null,
                ParentDocument: request.body.ParentDocument ?? null,
                ParentDocumentVersion: request.body.ParentDocumentVersion ?? null,
                ChunkingStrategy: request.body.ChunkingStrategy ?? null,
                ChunkingLenght: request.body.ChunkingLenght ?? null,
                ChunkOverlap: request.body.ChunkOverlap ?? null,
                Splitter: request.body.Splitter ?? null,
                IsActive: request.body.IsActive ?? null,
                CreatedBy: request.body.CreatedBy ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    // public validateSearchRequest = async (request: express.Request): Promise<BadgeSearchFilters> => {
    //     try {
    //         const schema = joi.object({
    //             categoryId : joi.string().uuid().optional(),
    //             clientId   : joi.string().uuid().optional(),
    //             name       : joi.string().max(64).optional(),
    //         });
    //         await schema.validateAsync(request.query);
    //         const filters = this.getSearchFilters(request.query);
    //         return filters;
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    // private getSearchFilters = (query): BadgeSearchFilters => {

    //     var filters = {};

    //     var name = query.name ? query.name : null;
    //     if (name != null) {
    //         filters['Name'] = name;
    //     }
    //     var clientId = query.clientId ? query.clientId : null;
    //     if (clientId != null) {
    //         filters['ClientId'] = clientId;
    //     }
    //     var categoryId = query.categoryId ? query.categoryId : null;
    //     if (categoryId != null) {
    //         filters['CategoryId'] = categoryId;
    //     }

    //     return filters;
    // };
}
