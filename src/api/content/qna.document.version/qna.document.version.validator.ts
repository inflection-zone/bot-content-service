import joi from 'joi';
import express from 'express';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import BaseValidator from '../../base.validator';
import {
    QnaDocumentVersionCreateModel,
    QnaDocumentVersionSearchFilters,
    QnaDocumentVersionUpdateModel,
} from '../../../domain.types/content/qna.document.version.domain.types';

///////////////////////////////////////////////////////////////////////////////////////////////

export class QnaDocumentVersionValidator extends BaseValidator {

    public validateCreateRequest = async (request: express.Request): Promise<QnaDocumentVersionCreateModel> => {
        try {
            const schema = joi.object({
                VersionNumber  : joi.string().required(),
                StorageUrl     : joi.string().required(),
                DownloadUrl    : joi.string().required(),
                FileResourceId : joi.string().required(),
                Keywords       : joi.array().items(joi.string().required()),
                QnaDocumentId  : joi.string().uuid().required(),
            });
            return await schema.validateAsync(request.body);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    public validateUpdateRequest = async (
        request: express.Request
    ): Promise<QnaDocumentVersionUpdateModel | undefined> => {
        try {
            const schema = joi.object({
                VersionNumber  : joi.string().optional(),
                StorageUrl     : joi.string().optional(),
                DownloadUrl    : joi.string().optional(),
                FileResourceId : joi.string().optional(),
                Keywords       : joi.array().items(joi.string().optional()),
                QnaDocumentId  : joi.string().uuid().optional(),
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

    public validateSearchRequest = async (request: express.Request): Promise<QnaDocumentVersionSearchFilters> => {
        try {
            const schema = joi.object({
                versionNumber  : joi.string().optional(),
                qnaDocumentId  : joi.string().uuid().optional(),
                storageUrl     : joi.string().optional(),
                downloadUrl    : joi.string().optional(),
                fileResourceId : joi.string().optional(),
                keywords       : joi.string().optional(),
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

        var versionNumber = query.versionNumber ? query.versionNumber : null;
        if (versionNumber != null) {
            filters['versionNumber'] = versionNumber;
        }
        // var QnaDocumentId = query.QnaDocumentId ? query.QnaDocumentId : null;
        // if (QnaDocumentId != null) {
        //     filters['QnaDocumentId'] = QnaDocumentId;
        // }
        var storageUrl = query.storageUrl ? query.storageUrl : null;
        if (storageUrl != null) {
            filters['storageUrl'] = storageUrl;
        }
        var downloadUrl = query.downloadUrl ? query.downloadUrl : null;
        if (downloadUrl != null) {
            filters['downloadUrl'] = downloadUrl;
        }
        var fileResourceId = query.fileResourceId ? query.fileResourceId : null;
        if (fileResourceId != null) {
            filters['fileResourceId'] = fileResourceId;
        }

        var keywords = query.keywords ? query.keywords : null;
        if (keywords != null) {
            filters['keywords'] = keywords;
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
