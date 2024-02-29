/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QnaDocument } from '../../models/qna.document/qna.document.model';

import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { Source } from '../../database.connector';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { BaseService } from '../base.service';
import { integer, uuid } from '../../../domain.types/miscellaneous/system.types';

import {
    QnaDocumentCreateModel,
    QnaDocumentUpdateModel,
} from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentResponseDto } from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocumentMapper } from '../../mappers/content/qna.document.mapper';
import { strategy } from 'sharp';

///////////////////////////////////////////////////////////////////////

export class QnaDocumentService extends BaseService {
    _qnaDocumentRepository: Repository<QnaDocument> = Source.getRepository(QnaDocument);

    public getAll = async (): Promise<QnaDocumentResponseDto[]> => {
        try {
            var document = await this._qnaDocumentRepository.find();
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public create = async (createModel: QnaDocumentCreateModel): Promise<QnaDocumentResponseDto> => {
        const group = this._qnaDocumentRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
            FileName: createModel.FileName,
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
                where: {
                    id: id,
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

    public update = async (id: uuid, model: QnaDocumentUpdateModel): Promise<QnaDocumentResponseDto> => {
        try {
            const document = await this._qnaDocumentRepository.findOne({
                where: {
                    id: id,
                },
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
                where: {
                    id: id,
                },
            });
            var result = await this._qnaDocumentRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByName = async (name: string) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where: {
                    Name: name,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getBySource = async (source: string) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where: {
                    Source: source,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByStrategy = async (strategy: string) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where: {
                    ChunkingStrategy: strategy,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByStatus = async (status: boolean) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where: {
                    IsActive: status,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByParentDocumentName = async (parentdocumentname: string) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where: {
                    ParentDocument: parentdocumentname,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByParentDocumentVersion = async (parentdocumentversion: number) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where: {
                    ParentDocumentVersion: parentdocumentversion,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByCreatedBy = async (createdby: string) => {
        try {
            var document = await this._qnaDocumentRepository.find({
                where: {
                    CreatedBy: createdby,
                },
            });
            return QnaDocumentMapper.toArrayDto(document);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public updateByName = async (name: string, model: QnaDocumentUpdateModel): Promise<QnaDocumentResponseDto> => {
        try {
            const document = await this._qnaDocumentRepository.findOne({
                where: {
                    Name: name,
                },
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

    public updateByFileName = async (
        filename: string,
        model: QnaDocumentUpdateModel
    ): Promise<QnaDocumentResponseDto> => {
        try {
            const document = await this._qnaDocumentRepository.findOne({
                where: {
                    FileName: filename,
                },
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

    public deleteByName = async (name: string): Promise<boolean> => {
        try {
            var record = await this._qnaDocumentRepository.findOne({
                where: {
                    Name: name,
                },
            });
            var result = await this._qnaDocumentRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public deleteByStatus = async (status: boolean): Promise<boolean> => {
        try {
            var record = await this._qnaDocumentRepository.findOne({
                where: {
                    IsActive: status,
                },
            });
            var result = await this._qnaDocumentRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };
}


