/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QnaDocumentVersion } from '../../models/qna.document/qna.document.version.model';

import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { Source } from '../../database.connector';
import { Between, FindManyOptions, Like, Repository } from 'typeorm';
import moment from 'moment';

import { BaseService } from '../base.service';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

import {
    QnaDocumentVersionCreateModel,
    QnaDocumentVersionSearchFilters,
    QnaDocumentVersionSearchResults,
    QnaDocumentVersionUpdateModel,
} from '../../../domain.types/content/qna.document.version.domain.types';
import { QnaDocumentVersionResponseDto } from '../../../domain.types/content/qna.document.version.domain.types';
import { QnaDocumentVersionMapper } from '../../mappers/content/qna.document.version.mapper';
import { QnaDocument } from '../../models/qna.document/qna.document.model';

///////////////////////////////////////////////////////////////////////

export class QnaDocumentVersionService extends BaseService {
    _qnaDocumentVersionRepository: Repository<QnaDocumentVersion> = Source.getRepository(QnaDocumentVersion);

    _documentRepository: Repository<QnaDocument> = Source.getRepository(QnaDocument);

    public create = async (createModel: QnaDocumentVersionCreateModel): Promise<QnaDocumentVersionResponseDto> => {
        const document = await this.getDocument(createModel.DocumentId);
        const version = this._qnaDocumentVersionRepository.create({
            DocumentId : createModel.DocumentId,
            VersionNumber: createModel.VersionNumber,
            StorageUrl: createModel.StorageUrl,
            DownloadUrl: createModel.DownloadUrl,
            FileResourceId: createModel.FileResourceId,
            Keywords: createModel.Keywords,
            QnaDocument: QnaDocument,
        });
        var record = await this._qnaDocumentVersionRepository.save(version);
        return QnaDocumentVersionMapper.toResponseDto(record);
    };

    private async getDocument(documentId: uuid) {
        const document = await this._documentRepository.findOne({
            where: {
                id: documentId,
            },
        });
        if (!document) {
            ErrorHandler.throwNotFoundError('Version cannot be found');
        }
        return document;
    }

    public getAll = async (): Promise<QnaDocumentVersionResponseDto[]> => {
        try {
            var documentversion = await this._qnaDocumentVersionRepository.find();
            return QnaDocumentVersionMapper.toArrayDto(documentversion);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<QnaDocumentVersionResponseDto> => {
        try {
            var documentversion = await this._qnaDocumentVersionRepository.findOne({
                where: {
                    id: id,
                },
            });
            return QnaDocumentVersionMapper.toResponseDto(documentversion);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public update = async (id: uuid, model: QnaDocumentVersionUpdateModel): Promise<QnaDocumentVersionResponseDto> => {
        try {
            const documentversion = await this._qnaDocumentVersionRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!documentversion) {
                ErrorHandler.throwNotFoundError('Document version not found!');
            }
            //Badge code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill

            if (model.VersionNumber != null) {
                documentversion.VersionNumber = model.VersionNumber;
            }
            if (model.StorageUrl != null) {
                documentversion.StorageUrl = model.StorageUrl;
            }
            if (model.DownloadUrl != null) {
                documentversion.DownloadUrl = model.DownloadUrl;
            }
            if (model.FileResourceId != null) {
                documentversion.FileResourceId = model.FileResourceId;
            }
            if (model.Keywords != null) {
                documentversion.Keywords = model.Keywords;
            }

            var record = await this._qnaDocumentVersionRepository.save(documentversion);
            return QnaDocumentVersionMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._qnaDocumentVersionRepository.findOne({
                where: {
                    id: id,
                },
            });
            var result = await this._qnaDocumentVersionRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    // public getByDate = async (date: string) => {
    //     try {
    //         const startDate = moment(date).startOf('day').toDate();
    //         const endDate = moment(date).endOf('day').toDate();

    //         const documentversion = await this._qnaDocumentVersionRepository.find({
    //             where: {
    //                 CreatedAt: Between(startDate, endDate),
    //             },
    //         });

    //         return QnaDocumentVersionMapper.toArrayDto(documentversion);
    //     } catch (error) {
    //         logger.error(error.message);
    //         ErrorHandler.throwInternalServerError(error.message, 500);
    //     }
    // };

    public search = async (filters: QnaDocumentVersionSearchFilters): Promise<QnaDocumentVersionSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._qnaDocumentVersionRepository.findAndCount(search);

            const searchResults = {
                TotalCount: count,
                RetrievedCount: list.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: list.map((x) => QnaDocumentVersionMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: QnaDocumentVersionSearchFilters) => {
        var search: FindManyOptions<QnaDocumentVersion> = {
            relations: {},
            where: {},
            select: {
                VersionNumber: true,
                StorageUrl: true,
                DownloadUrl: true,
                FileResourceId: true,
                Keywords: true,
            },
        };

        if (filters.VersionNumber) {
            search.where['VersionNumber'] = Like(`%${filters.VersionNumber}%`);
        }
        if (filters.StorageUrl) {
            search.where['StorageUrl'] = filters.StorageUrl;
        }
        if (filters.DownloadUrl) {
            search.where['DownloadUrl'] = filters.DownloadUrl;
        }
        if (filters.FileResourceId) {
            search.where['FileResourceId'] = filters.FileResourceId;
        }
        if (filters.Keywords) {
            search.where['Keywords'] = filters.Keywords;
        }

        return search;
    };
}
