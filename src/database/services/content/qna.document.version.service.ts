/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QnaDocumentVersion } from '../../models/qna.document/qna.document.version.model';

import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { Source } from '../../database.connector';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { BaseService } from '../base.service';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

import {
    QnaDocumentVersionCreateModel,
    QnaDocumentVersionUpdateModel,
} from '../../../domain.types/content/qna.document.version.domain.types';
import { QnaDocumentVersionResponseDto } from '../../../domain.types/content/qna.document.version.domain.types';
import { QnaDocumentVersionMapper } from '../../mappers/content/qna.document.version.mapper';

///////////////////////////////////////////////////////////////////////

export class QnaDocumentVersionService extends BaseService {
    _qnaDocumentVersionRepository: Repository<QnaDocumentVersion> = Source.getRepository(QnaDocumentVersion);

    public create = async (createModel: QnaDocumentVersionCreateModel): Promise<QnaDocumentVersionResponseDto> => {
        const version = this._qnaDocumentVersionRepository.create({
            VersionNumber: createModel.VersionNumber,
            StorageUrl: createModel.StorageUrl,
            DownloadUrl: createModel.DownloadUrl,
            FileResourceId: createModel.FileResourceId,
            Keywords: createModel.Keywords,
        });
        var record = await this._qnaDocumentVersionRepository.save(version);
        return QnaDocumentVersionMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<QnaDocumentVersionResponseDto> => {
        try {
            var documentversion = await this._qnaDocumentVersionRepository.findOne({
                where: {
                    id: id,
                },
                // relations: {
                //     Category: true,
                //     Client  : true
                // }
            });
            return QnaDocumentVersionMapper.toResponseDto(documentversion);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    // public search = async (filters: QnaDocumentSearchFilters)
    //     : Promise<QnaDocumentSearchResults> => {
    //     try {
    //         var search = this.getSearchModel(filters);
    //         var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
    //         const [list, count] = await this._qnaDocumentRepository.findAndCount(search);
    //         const searchResults = {
    //             TotalCount     : count,
    //             RetrievedCount : list.length,
    //             PageIndex      : pageIndex,
    //             ItemsPerPage   : limit,
    //             Order          : order === 'DESC' ? 'descending' : 'ascending',
    //             OrderedBy      : orderByColumn,
    //             Items          : list.map(x => QnaDocumentMapper.toResponseDto(x)),
    //         };
    //         return searchResults;
    //     } catch (error) {
    //         logger.error(error.message);
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
    //     }
    // };

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

    //#region Privates

    // private getSearchModel = (filters: BadgeSearchFilters) => {

    //     var search : FindManyOptions<Badge> = {
    //         relations : {
    //         },
    //         where : {
    //         },
    //         select : {
    //             id      : true,
    //             Category: {
    //                 id         : true,
    //                 Name       : true,
    //                 Description: true,
    //             },
    //             Client       : {
    //                 id  : true,
    //                 Name: true,
    //                 Code: true,
    //             },
    //             Name       : true,
    //             Description: true,
    //             ImageUrl   : true,
    //             CreatedAt  : true,
    //             UpdatedAt  : true,
    //         }
    //     };

    //     if (filters.CategoryId) {
    //         search.where['Category'].id = filters.CategoryId;
    //     }
    //     if (filters.ClientId) {
    //         search.where['Client'].id = filters.ClientId;
    //     }
    //     if (filters.Name) {
    //         search.where['Name'] = Like(`%${filters.Name}%`);
    //     }

    //     return search;
    // };

    //#endregion
}
