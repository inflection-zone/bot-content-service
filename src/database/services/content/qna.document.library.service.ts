/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QnaDocumentLibrary } from '../../models/qna.document/qna.document.library.model';

import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { Source } from '../../database.connector';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { BaseService } from '../base.service';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

import {
    QnaDocumentLibraryCreateModel,
    QnaDocumentLibraryUpdateModel,
} from '../../../domain.types/content/qna.document.library.domain.types';
import { QnaDocumentLibraryResponseDto } from '../../../domain.types/content/qna.document.library.domain.types';
import { QnaDocumentLibraryMapper } from '../../mappers/content/qna.document.library.mapper';

///////////////////////////////////////////////////////////////////////

export class QnaDocumentLibraryService extends BaseService {
    _qnaDocumentLibraryRepository: Repository<QnaDocumentLibrary> = Source.getRepository(QnaDocumentLibrary);

    public getAll = async (): Promise<QnaDocumentLibraryResponseDto[]> => {
        try {
            var documentlibrary = await this._qnaDocumentLibraryRepository.find();
            return QnaDocumentLibraryMapper.toArrayDto(documentlibrary);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public create = async (createModel: QnaDocumentLibraryCreateModel): Promise<QnaDocumentLibraryResponseDto> => {
        const library = this._qnaDocumentLibraryRepository.create({
            DocumentId: createModel.DocumentId,
        });
        var record = await this._qnaDocumentLibraryRepository.save(library);
        return QnaDocumentLibraryMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<QnaDocumentLibraryResponseDto> => {
        try {
            var documentlibrary = await this._qnaDocumentLibraryRepository.findOne({
                where: {
                    id: id,
                },
                // relations: {
                //     Category: true,
                //     Client  : true
                // }
            });
            return QnaDocumentLibraryMapper.toResponseDto(documentlibrary);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public update = async (id: uuid, model: QnaDocumentLibraryUpdateModel): Promise<QnaDocumentLibraryResponseDto> => {
        try {
            const documentlibrary = await this._qnaDocumentLibraryRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!documentlibrary) {
                ErrorHandler.throwNotFoundError('Document library not found!');
            }
            //Badge code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill

            if (model.DocumentId != null) {
                documentlibrary.DocumentId = model.DocumentId;
            }

            var record = await this._qnaDocumentLibraryRepository.save(documentlibrary);
            return QnaDocumentLibraryMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._qnaDocumentLibraryRepository.findOne({
                where: {
                    id: id,
                },
            });
            var result = await this._qnaDocumentLibraryRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };
}
