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
}
