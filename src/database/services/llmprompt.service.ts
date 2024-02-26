
// import express from 'express';
import { BaseService } from './base.service';
import { LlmPrompt } from '../models/llm.prompt/llm.prompts.model';
import { LlmPromptMapper } from '../mappers/llm.prompt/llm.prompt.mapper';
import { logger } from '../../logger/logger';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { LlmPromptCreateModel, LlmPromptDto, LlmPromptUpdateModel } from '../../domain.types/llm.prompt/llm.prompt.domain.types';
import { Source } from '../database.connector';
import { Repository } from 'typeorm/repository/Repository';
import { uuid } from '../../domain.types/miscellaneous/system.types';

export class LlmpromptService extends BaseService {

    _llmPromptRepository: Repository<LlmPrompt> = Source.getRepository(LlmPrompt);

    // create = async (request: express.Request, response: express.Response) => {
    public create = async (createModel: LlmPromptCreateModel)
        : Promise<LlmPromptDto> => {
        try {
            const data = this._llmPromptRepository.create({
                Name              : createModel.Name,
                Description       : createModel.Description,
                UseCaseType       : createModel.UseCaseType,
                ModelName         : createModel.ModelName,
                ModelVersion      : createModel.ModelVersion,
                UserId            : createModel.UserId,
                Temperature       : createModel.Temperature,
                FrequencyPenality : createModel.FrequencyPenality,
                TopP              : createModel.TopP,
                PresencePenalty   : createModel.PresencePenalty,
                IsActive          : createModel.IsActive,
            });
            var record = await this._llmPromptRepository.save(data);
            return LlmPromptMapper.toResponseDto(record);
        }
        catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };
    
    public update = async (id: uuid, model: LlmPromptUpdateModel)
    : Promise<LlmPromptDto> => {
        try {
            const updateData = await this._llmPromptRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('LLm prompt not found!');
            }
            if (model.Name != null) {
                updateData.Name = model.Name;
            }
            if ( model.Description != null) {
                updateData.Description = model.Description;
            }
            if ( model.UseCaseType != null) {
                updateData.UseCaseType = model.UseCaseType;
            }
            if ( model.ModelName != null) {
                updateData.ModelName = model.ModelName;
            }
            if ( model.ModelVersion != null) {
                updateData.ModelVersion = model.ModelVersion;
            }
            if (  model.UserId != null) {
                updateData.UserId = model.UserId;
            }
            if ( model.Temperature != null) {
                updateData.Temperature = model.Temperature;
            }
            if ( model.FrequencyPenality != null) {
                updateData.FrequencyPenality = model.FrequencyPenality;
            }
            if ( model.TopP != null) {
                updateData.TopP = model.TopP;
            }
            if ( model.PresencePenalty != null) {
                updateData.PresencePenalty  = model.PresencePenalty;
            }
            if ( model.IsActive != null) {
                updateData.IsActive = model.IsActive;
            }
         
            var record = await this._llmPromptRepository.save(updateData);
            return LlmPromptMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<LlmPromptDto> => {
        try {
            var llmPromptId = await this._llmPromptRepository.findOne({
                where : {
                    id : id
                },
            });
            return LlmPromptMapper.toResponseDto(llmPromptId);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getAll = async (): Promise<LlmPromptDto[]> =>{
        try {
            const data = [];
            var prompts = await this._llmPromptRepository.find();
            for (var i of prompts) {
                const record = LlmPromptMapper.toResponseDto(i);
                // const record = i;
                data.push(record);
            }
            return data;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to get Llm prompt record!', error);
        }
    };


}
