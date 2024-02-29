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
