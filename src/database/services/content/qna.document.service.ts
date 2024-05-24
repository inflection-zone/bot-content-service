import { QnaDocument } from '../../models/content/qna.document.model';
import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { Source } from '../../database.connector';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import {
    QnaDocumentCreateModel,
    QnaDocumentSearchFilters,
    QnaDocumentSearchResults,
    QnaDocumentUpdateModel,
} from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentResponseDto } from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentMapper } from '../../mappers/content/qna.document.mapper';
import { FileResource } from '../../models/file.resource/file.resource.model';

///////////////////////////////////////////////////////////////////////

export class QnaDocumentService extends BaseService {

    _qnaDocumentRepository: Repository<QnaDocument> = Source.getRepository(QnaDocument);

    _fileResourceRepository : Repository<FileResource> = Source.getRepository(FileResource);

    public create = async (createModel: QnaDocumentCreateModel): Promise<QnaDocumentResponseDto> => {
        try {
            const fileResource = await this._fileResourceRepository.findOne({
                where : { id: createModel.ResourceId },
            });
            if (!fileResource) {
                ErrorHandler.throwNotFoundError('File ResourceId cannot be found');
            }
            const document = this._qnaDocumentRepository.create({
                Name                  : createModel.Name,
                Description           : createModel.Description,
                FileName              : createModel.FileName,
                Source                : createModel.Source,
                ParentDocument        : createModel.ParentDocument,
                ParentDocumentVersion : createModel.ParentDocumentVersion,
                ChunkingStrategy      : createModel.ChunkingStrategy,
                ChunkingLength        : createModel.ChunkingLength,
                ChunkOverlap          : createModel.ChunkOverlap,
                Splitter              : createModel.Splitter,
                IsActive              : createModel.IsActive,
                CreatedBy             : createModel.CreatedBy,
                ResourceId            : fileResource
            });
            var record = await this._qnaDocumentRepository.save(document);
            return QnaDocumentMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public update = async (id: uuid, model: QnaDocumentUpdateModel): Promise<QnaDocumentResponseDto> => {
        try {
            const document = await this._qnaDocumentRepository.findOne({
                where : {
                    id : id,
                },
            });
            if (!document) {
                ErrorHandler.throwNotFoundError('Document not found!');
            }

            if (model.Name != null) {
                document.Name = model.Name;
            }
            if (model.Description != null) {
                document.Description = model.Description;
            }
            if (model.FileName != null) {
                document.FileName = model.FileName;
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
            if (model.ChunkingLength != null) {
                document.ChunkingLength = model.ChunkingLength;
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
            // if (model.ResourceId != null) {
            //     document.ResourceId = model.ResourceId;
            // }
            var record = await this._qnaDocumentRepository.save(document);
            return QnaDocumentMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<QnaDocumentResponseDto> => {
        try {
            var document = await this._qnaDocumentRepository.findOne({
                where : {
                    id : id,
                },
            });
            return QnaDocumentMapper.toResponseDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByStatus = async (status: boolean) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where : {
                    IsActive : status,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getAll = async (): Promise<QnaDocumentResponseDto[]> => {
        try {
            var document = await this._qnaDocumentRepository.find();
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var result = await this._qnaDocumentRepository.softDelete(id);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public search = async (filters: QnaDocumentSearchFilters): Promise<QnaDocumentSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._qnaDocumentRepository.findAndCount(search);

            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map((x) => QnaDocumentMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: QnaDocumentSearchFilters) => {
        var search: FindManyOptions<QnaDocument> = {
            relations : {},
            where     : {},
            select    : {
                Name                  : true,
                Description           : true,
                FileName              : true,
                Source                : true,
                ParentDocument        : true,
                ParentDocumentVersion : true,
                ChunkingStrategy      : true,
                ChunkingLength        : true,
                ChunkOverlap          : true,
                Splitter              : true,
                IsActive              : true,
                CreatedBy             : true,
                
            },
        };

        if (filters.name) {
            search.where['Name'] = Like(`%${filters.name}%`);
        }
        if (filters.description) {
            search.where['Description'] = filters.description;
        }
        if (filters.fileName) {
            search.where['FileName'] = filters.fileName;
        }
        if (filters.source) {
            search.where['Source'] = filters.source;
        }
        if (filters.parentDocument) {
            search.where['ParentDocument'] = filters.parentDocument;
        }
        if (filters.parentDocumentVersion) {
            search.where['ParentDocumentVersion'] = filters.parentDocumentVersion;
        }
        if (filters.chunkingStrategy) {
            search.where['ChunkingStrategy'] = filters.chunkingStrategy;
        }
        if (filters.chunkingLength) {
            search.where['ChunkingLength'] = filters.chunkingLength;
        }
        if (filters.chunkOverlap) {
            search.where['ChunkOverlap'] = filters.chunkOverlap;
        }
        if (filters.splitter) {
            search.where['Splitter'] = filters.splitter;
        }
        if (filters.isActive) {
            search.where['IsActive'] = filters.isActive;
        }
        if (filters.createdBy) {
            search.where['CreatedBy'] = filters.createdBy;
        }
        return search;
    };

}
