import { BaseService } from './base.service';
import { logger } from '../../logger/logger';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { Source } from '../database.connector';
import { Repository } from 'typeorm/repository/Repository';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LlmPromptGroup } from '../models/llm.prompt/llm.prompt.groups.model';
import { LlmPromptGroupCreateModel } from '../../domain.types/llm.prompt/llm.prompt.group.domain.types';
import { LlmPromptGroupDto } from '../../domain.types/llm.prompt/llm.prompt.group.domain.types';
import { LlmPromptGroupMapper } from '../mappers/llm.prompt/llm.prompt.groups.mapper';
import { LlmPromptGroupUpdateModel } from '../../domain.types/llm.prompt/llm.prompt.group.domain.types';

export class LlmpromptGroupService extends BaseService {

    _llmPromptGroupRepository: Repository<LlmPromptGroup> = Source.getRepository(LlmPromptGroup);

    // create = async (request: express.Request, response: express.Response) => {
    public create = async (createModel: LlmPromptGroupCreateModel)
        : Promise<LlmPromptGroupDto> => {
        try {
            const data = this._llmPromptGroupRepository.create({
                Name        : createModel.Name,
                Description : createModel.Description,
            });
            var record = await this._llmPromptGroupRepository.save(data);
            return LlmPromptGroupMapper.toResponseDto(record);
        }
        catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };
    
    public update = async (id: uuid, model: LlmPromptGroupUpdateModel)
    : Promise<LlmPromptGroupDto> => {
        try {
            const updateData = await this._llmPromptGroupRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('LLm prompt group not found!');
            }
            if (model.Name != null) {
                updateData.Name = model.Name;
            }
            if ( model.Description != null) {
                updateData.Description = model.Description;
            }
            var record = await this._llmPromptGroupRepository.save(updateData);
            return LlmPromptGroupMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<LlmPromptGroupDto> => {
        try {
            var llmPromptGroupId = await this._llmPromptGroupRepository.findOne({
                where : {
                    id : id
                },
            });
            return LlmPromptGroupMapper.toResponseDto(llmPromptGroupId);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getAll = async (): Promise<LlmPromptGroupDto[]> =>{
        try {
            const data = [];
            var prompts = await this._llmPromptGroupRepository.find();
            for (var i of prompts) {
                const record = LlmPromptGroupMapper.toResponseDto(i);
                // const record = i;
                data.push(record);
            }
            return data;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to get Llm prompt group record!', error);
        }
    };
    
    public delete = async (id: uuid)=> {
        try {
            var record = await this._llmPromptGroupRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._llmPromptGroupRepository.remove(record);
            result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };


}
