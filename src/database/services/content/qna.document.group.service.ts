/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QnaDocumentGroup } from '../../models/qna.document/qna.document.groups.model';

import { logger } from '../../../logger/logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { Source } from '../../database.connector';
import { FindManyOptions, Like, Repository } from 'typeorm';

import { BaseService } from '../base.service';
import { uuid } from '../../../domain.types/miscellaneous/system.types';

import {
    QnaDocumentGroupCreateModel,
    QnaDocumentGroupUpdateModel,
} from '../../../domain.types/content/qna.document.group.domain.types';
import { QnaDocumentGroupResponseDto } from '../../../domain.types/content/qna.document.group.domain.types';
// import { QnaDocuments } from '../../models/qna.documents/qna.document.model';
import { QnaDocumentGroupsMapper } from '../../mappers/content/qna.document.group.mapper';

///////////////////////////////////////////////////////////////////////

export class QnaDocumentGroupsService extends BaseService {
    _qnaDocumentGroupsRepository: Repository<QnaDocumentGroup> = Source.getRepository(QnaDocumentGroup);


    public getAll = async (): Promise<QnaDocumentGroupResponseDto[]> => {
        try {
            var documentGroup = await this._qnaDocumentGroupsRepository.find();
            return QnaDocumentGroupsMapper.toArrayDto(documentGroup);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public create = async (createModel: QnaDocumentGroupCreateModel): Promise<QnaDocumentGroupResponseDto> => {
        const group = this._qnaDocumentGroupsRepository.create({
            Name: createModel.Name,
            Description: createModel.Description,
        });
        var record = await this._qnaDocumentGroupsRepository.save(group);
        return QnaDocumentGroupsMapper.toResponseDto(record);
    };

    public getById = async (id: uuid): Promise<QnaDocumentGroupResponseDto> => {
        try {
            var documentGroup = await this._qnaDocumentGroupsRepository.findOne({
                where: {
                    id: id,
                },
                // relations: {
                //     Category: true,
                //     Client  : true
                // }
            });
            return QnaDocumentGroupsMapper.toResponseDto(documentGroup);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public update = async (id: uuid, model: QnaDocumentGroupUpdateModel): Promise<QnaDocumentGroupResponseDto> => {
        try {
            const documentGroup = await this._qnaDocumentGroupsRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!documentGroup) {
                ErrorHandler.throwNotFoundError('Documentgroup not found!');
            }
            //Badge code is not modifiable
            //Use renew key to update ApiKey, ValidFrom and ValidTill

            if (model.Name != null) {
                documentGroup.Name = model.Name;
            }
            if (model.Description != null) {
                documentGroup.Description = model.Description;
            }

            var record = await this._qnaDocumentGroupsRepository.save(documentGroup);
            return QnaDocumentGroupsMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            var record = await this._qnaDocumentGroupsRepository.findOne({
                where: {
                    id: id,
                },
            });
            var result = await this._qnaDocumentGroupsRepository.remove(record);
            return result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getByName = async (name: string) => {
        try {
            var documentGroup = await this._qnaDocumentGroupsRepository.find({
                where: {
                    Name: name,
                },
            });
            return QnaDocumentGroupsMapper.toArrayDto(documentGroup);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };
}
