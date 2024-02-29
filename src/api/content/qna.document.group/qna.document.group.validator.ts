/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
import joi from 'joi';
import express from 'express';

import {
    ErrorHandler
} from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import { QnaDocumentGroup } from '../../../database/models/qna.document/qna.document.groups.model';

// import { QnaDocuments } from 'src/database/models/qna.documents/qna.documents.model';
import { QnaDocumentGroupCreateModel, QnaDocumentGroupUpdateModel } from '../../../domain.types/content/qna.document.group.domain.types';
// import BaseValidator from 'src/api/base.validator';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentGroupsValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<QnaDocumentGroupCreateModel> => {
        try {
            const schema = joi.object({
                
                Name        : joi.string().max(32).required(),
                Description : joi.string().max(256).optional(),
                // qna_documents : joi.string(),
                
            });
            await schema.validateAsync(request.body);
            return {
                Name        : request.body.Name,
               
                Description : request.body.Description ?? null,
                // qna_documents : request.body.QnaDocuments,
            };
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (request: express.Request): Promise<QnaDocumentGroupUpdateModel|undefined> => {
        try {
            const schema = joi.object({
               
                Name        : joi.string().max(32).optional(),
                Description : joi.string().max(256).optional(),
                // QnaDocuments : joi.string(),
            });
            await schema.validateAsync(request.body);
            return {
                Name        : request.body.Name ?? null,
                
                Description : request.body.Description ?? null,
                // QnaDocument : request.body.QnaDocuments ?? null,
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