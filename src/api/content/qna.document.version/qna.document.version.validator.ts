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
    QnaDocumentVersionCreateModel,
    QnaDocumentVersionSearchFilters,
    QnaDocumentVersionUpdateModel,
} from '../../../domain.types/content/qna.document.version.domain.types';
import { integer } from '../../../domain.types/miscellaneous/system.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentVersionValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<QnaDocumentVersionCreateModel> => {
        try {
            const schema = joi.object({
                VersionNumber: joi.number(),
                StorageUrl: joi.string(),
                DownloadUrl: joi.string(),
                FileResourceId: joi.string(),
                Keywords: joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                VersionNumber: request.body.VersionNumber,
                StorageUrl: request.body.StorageUrl,
                DownloadUrl: request.body.DownloadUrl,
                FileResourceId: request.body.FileResourceId,
                Keywords: request.body.Keywords,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<QnaDocumentVersionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                VersionNumber: joi.number(),
                StorageUrl: joi.string(),
                DownloadUrl: joi.string(),
                FileResourceId: joi.string(),
                Keywords: joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                VersionNumber: request.body.VersionNumber ?? null,
                StorageUrl: request.body.StorageUrl ?? null,
                DownloadUrl: request.body.DownloadUrl ?? null,
                FileResourceId: request.body.FileResourceId ?? null,
                Keywords: request.body.Keywords ?? null,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateSearchRequest = async (request: express.Request): Promise<QnaDocumentVersionSearchFilters> => {
        try {
            const schema = joi.object({
                VersionNumber: joi.string().optional(),
                StorageUrl: joi.string().optional(),
                DownloadUrl: joi.string().optional(),
                FileResourceId: joi.string().optional(),
                Keywords: joi.string().optional(),
            });

            await schema.validateAsync(request.query);
            const filters = this.getSearchFilters(request.query);
            return filters;
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    private getSearchFilters = (query): QnaDocumentVersionSearchFilters => {
        var filters = {};

        var VersionNumber = query.VersionNumber ? query.VersionNumber : null;
        if (VersionNumber != null) {
            filters['VersionNumber'] = VersionNumber;
        }
        var StorageUrl = query.StorageUrl ? query.StorageUrl : null;
        if (StorageUrl != null) {
            filters['StorageUrl'] = StorageUrl;
        }
        var DownloadUrl = query.DownloadUrl ? query.DownloadUrl : null;
        if (DownloadUrl != null) {
            filters['DownloadUrl'] = DownloadUrl;
        }
        var FileResourceId = query.FileResourceId ? query.FileResourceId : null;
        if (FileResourceId != null) {
            filters['FileResourceId'] = FileResourceId;
        }
        var Keywords = query.Keywords ? query.Keywords : null;
        if (Keywords != null) {
            filters['Keywords'] = Keywords;
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
