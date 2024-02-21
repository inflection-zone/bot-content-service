/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QnaDocument } from '../../models/qna.documents/qna.document.model';

import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { Source } from '../../database.connector';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { BaseService } from '../base.service';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

import { QnaDocumentCreateModel, QnaDocumentUpdateModel } from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentResponseDto } from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentMapper } from '../../mappers/content/qna.document.mapper';

///////////////////////////////////////////////////////////////////////

export class QnaDocumentService extends BaseService {
    _qnaDocumentRepository: Repository<QnaDocument> = Source.getRepository(QnaDocument);

    public create = async (createModel: QnaDocumentCreateModel): Promise<QnaDocumentResponseDto> => {
        const group = this._qnaDocumentRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            Filename: createModel.Filename,
            Source: createModel.Source,
            ParentDocument: createModel.ParentDocument,
            ParentDocumentVersion: createModel.ParentDocumentVersion,
            ChunkingStrategy: createModel.ChunkingStrategy,
            ChunkingLenght: createModel.ChunkingLenght,
            ChunkOverlap: createModel.ChunkOverlap,
            Splitter: createModel.Splitter,
            IsActive: createModel.IsActive,
            CreatedBy: createModel.CreatedBy,
        });
        var record = await this._qnaDocumentRepository.save(group);
        return QnaDocumentMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<QnaDocumentResponseDto> => {
        try {
            var document = await this._qnaDocumentRepository.findOne({
                where : {
                    id : id
                },
                // relations: {
                //     Category: true,
                //     Client  : true
                // }
            });
            return QnaDocumentMapper.toResponseDto(document);
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

    public update = async (id: uuid, model: QnaDocumentUpdateModel)
        : Promise<QnaDocumentResponseDto> => {
        try {
            const document = await this._qnaDocumentRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!document) {
                ErrorHandler.throwNotFoundError('Document not found!');
            }
            //Badge code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill

           
            if (model.Name != null) {
                document.Name = model.Name;
            }
            if (model.Description != null) {
                document.Description = model.Description;
            }
            if (model.Filename != null) {
                document.Filename = model.Filename;
            }
            if (model.Source != null) {
                document.Source = model.Source;
            }
            if (model.ParentDocument != null) {
                document.ParentDocument = model.ParentDocument;
            }
            if (model.ParentDocumentVersion != null) {
                document.ParentDocumentVersion = model.ParentDocumentVersion;
            }
            if (model.ChunkingStrategy != null) {
                document.ChunkingStrategy = model.ChunkingStrategy;
            }
            if (model.ChunkingLenght != null) {
                document.ChunkingLenght = model.ChunkingLenght;
            }
            if (model.ChunkOverlap != null) {
                document.ChunkOverlap = model.ChunkOverlap;
            }
            if (model.Splitter != null) {
                document.Splitter = model.Splitter;
            }
            if (model.IsActive != null) {
                document.IsActive = model.IsActive;
            }
            if (model.CreatedBy != null) {
                document.CreatedBy = model.CreatedBy;
            }
            var record = await this._qnaDocumentRepository.save(document);
            return QnaDocumentMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._qnaDocumentRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._qnaDocumentRepository.remove(record);
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
