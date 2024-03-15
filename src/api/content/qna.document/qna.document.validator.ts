/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
import joi from 'joi';
import express from 'express';

import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';

// import { QnaDocuments } from 'src/database/models/qna.documents/qna.documents.model';

import {
    QnaDocumentCreateModel,
    QnaDocumentSearchFilters,
    QnaDocumentUpdateModel,
} from '../../../domain.types/content/qna.document.domain.types';
import { integer } from '../../../domain.types/miscellaneous/system.types';

import { QnaDocument } from '../../../database/models/qna.document/qna.document.model';
import { ChunkingStrategy } from '../../../domain.types/chunking.strategy.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<QnaDocumentCreateModel> => {
        try {
            const schema = joi.object({
                Name: joi.string(),
                Description: joi.string(),
                FileName: joi.string(),
                Source: joi.string(),
                ParentDocument: joi.string(),
                ParentDocumentVersion: joi.number(),
                ChunkingStrategy: joi.string(),
                ChunkingLenght: joi.number(),
                ChunkOverlap: joi.number(),
                Splitter: joi.string(),
                IsActive: joi.boolean(),
                CreatedBy: joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name,
                Description: request.body.Description,
                FileName: request.body.FileName,
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
                FileName: joi.string(),
                Source: joi.string(),
                ParentDocument: joi.string(),
                ParentDocumentVersion: joi.number(),
                ChunkingStrategy: joi.string(),
                ChunkingLenght: joi.number(),
                ChunkOverlap: joi.number(),
                Splitter: joi.string(),
                IsActive: joi.boolean(),
                CreatedBy: joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                Name: request.body.Name ?? null,
                Description: request.body.Description ?? null,
                FileName: request.body.FileName ?? null,
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

    public validateSearchRequest = async (request: express.Request): Promise<QnaDocumentSearchFilters> => {
        try {
            const schema = joi.object({
                Name: joi.string().optional(),
                Description: joi.string().optional(),
                FileName: joi.string().optional(),
                Source: joi.string().optional(),
                ParentDocument: joi.string().optional(),
                ParentDocumentVersion: joi.string().optional(),
                ChunkingStrategy: joi
                    .string()
                    .valid(...Object.values(ChunkingStrategy))
                    .optional(),
                ChunkingLenght: joi.number().optional(),
                ChunkOverlap: joi.number().optional(),
                Splitter: joi.number().optional(),
                IsActive: joi.boolean().optional(),
                CreatedBy: joi.number().optional(),
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

        var Name = query.Name ? query.Name : null;
        if (Name != null) {
            filters['Name'] = Name;
        }
        var Description = query.Description ? query.Description : null;
        if (Description != null) {
            filters['Description'] = Description;
        }
        var FileName = query.FileName ? query.FileName : null;
        if (FileName != null) {
            filters['FileName'] = FileName;
        }
        var Source = query.Source ? query.Source : null;
        if (Source != null) {
            filters['Source'] = Source;
        }
        var ParentDocument = query.ParentDocument ? query.ParentDocument : null;
        if (ParentDocument != null) {
            filters['ParentDocument'] = ParentDocument;
        }
        var ParentDocumentVersion = query.ParentDocumentVersion ? query.ParentDocumentVersion : null;
        if (ParentDocumentVersion != null) {
            filters['ParentDocumentVersion'] = ParentDocumentVersion;
        }
        var ChunkingStrategy = query.ChunkingStrategy ? query.ChunkingStrategy : null;
        if (ChunkingStrategy != null) {
            filters['ChunkingStrategy'] = ChunkingStrategy;
        }
        var ChunkingLenght = query.ChunkingLenght ? query.ChunkingLenght : null;
        if (ChunkingLenght != null) {
            filters['ChunkingLenght'] = ChunkingLenght;
        }
        var ChunkOverlap = query.ChunkOverlap ? query.ChunkOverlap : null;
        if (ChunkOverlap != null) {
            filters['ChunkOverlap'] = ChunkOverlap;
        }
        var Splitter = query.Splitter ? query.Splitter : null;
        if (Splitter != null) {
            filters['Splitter'] = Splitter;
        }
        var IsActive = query.IsActive ? query.IsActive : null;
        if (IsActive != null) {
            filters['IsActive'] = IsActive;
        }
        var CreatedBy = query.CreatedBy ? query.CreatedBy : null;
        if (CreatedBy != null) {
            filters['CreatedBy'] = CreatedBy;
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