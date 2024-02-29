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
    QnaDocumentLibraryCreateModel,
    QnaDocumentLibraryUpdateModel,
} from '../../../domain.types/content/qna.document.library.domain.types';


///////////////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentLibraryValidator extends BaseValidator {
    public validateCreateRequest = async (request: express.Request): Promise<QnaDocumentLibraryCreateModel> => {
        try {
            const schema = joi.object({
                DocumentId: joi.string().uuid(),
            });
            await schema.validateAsync(request.body);
            return {
                DocumentId: request.body.DocumentId,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<QnaDocumentLibraryUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                DocumentId: joi.string().uuid(),
            });
            await schema.validateAsync(request.body);
            return {
                DocumentId: request.body.DocumentId ?? null,
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
