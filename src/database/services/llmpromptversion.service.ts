import { BaseService } from './base.service';
import { logger } from '../../logger/logger';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { Source } from '../database.connector';
import { Repository } from 'typeorm/repository/Repository';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LlmPromptVersion } from '../models/llm.prompt/llm.prompt.versions.model';
import { LlmPromptVersionCreateModel } from '../../domain.types/llm.prompt/llm.prompt.version.domain.types';
import { LlmPromptVersionUpdateModel } from '../../domain.types/llm.prompt/llm.prompt.version.domain.types';
import { LlmPromptVersionDto } from '../../domain.types/llm.prompt/llm.prompt.version.domain.types';
import { LlmPromptVersionMapper } from '../mappers/llm.prompt/llm.prompt.version.mapper';

export class LlmpromptVersionService extends BaseService {
    

    _llmPromptVersionRepository: Repository<LlmPromptVersion> = Source.getRepository(LlmPromptVersion);

    // create = async (request: express.Request, response: express.Response) => {
    public create = async (createModel: LlmPromptVersionCreateModel)
        : Promise<LlmPromptVersionDto> => {
        try {
            const data = this. _llmPromptVersionRepository.create({
                VersionNumber : createModel.VersionNumber,
                PromptId      : createModel.PromptId,
                Prompt        : createModel.Prompt,
                Variables     : JSON.stringify(createModel.Variables),
                Score         : createModel.Score,
                PublishedAt   : createModel.PublishedAt,
            });
            var record = await this._llmPromptVersionRepository.save(data);
            return LlmPromptVersionMapper.toResponseDto(record);
        }
        catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };
    
    public update = async (id: uuid, model: LlmPromptVersionUpdateModel)
    : Promise<LlmPromptVersionDto> => {
        try {
            const updateData = await this._llmPromptVersionRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('LLm prompt version not found!');
            }
            if (model.VersionNumber != null) {
                updateData.VersionNumber = model.VersionNumber;
            }
            if ( model.Prompt != null) {
                updateData.Prompt = model.Prompt;
            }
            if ( model.Variables != null) {
                updateData.Variables  = JSON.stringify(model.Variables);
            }
            if ( model.Score != null) {
                updateData.Score = model.Score;
            }
            if ( model.PublishedAt != null) {
                updateData.PublishedAt = model.PublishedAt;
            }
                  
            var record = await this._llmPromptVersionRepository.save(updateData);
            return LlmPromptVersionMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<LlmPromptVersionDto> => {
        try {
            var llmPromptVersionId = await this._llmPromptVersionRepository.findOne({
                where : {
                    id : id
                },
            });
            return LlmPromptVersionMapper.toResponseDto(llmPromptVersionId);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getAll = async (): Promise<LlmPromptVersionDto[]> =>{
        try {
            const data = [];
            var prompts = await this._llmPromptVersionRepository.find();
            for (var i of prompts) {
                const record = LlmPromptVersionMapper.toResponseDto(i);
                // const record = i;
                data.push(record);
            }
            return data;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to get Llm prompt version record!', error);
        }
    };
    
    public delete = async (id: uuid)=> {
        try {
            var record = await this._llmPromptVersionRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._llmPromptVersionRepository.remove(record);
            result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

}
