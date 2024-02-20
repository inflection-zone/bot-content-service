/* eslint-disable linebreak-style */
import { Repository } from 'typeorm';
import { LlmPrompts } from '../../models/llm.prompt/llm.prompts.model';
import { LlmPromptsCreateModel , LlmPromptsResponseDto } from '../../../domain.types/llm.prompt/llm.prompt.domain.types';
import { Source } from '../../database.connector';
import { DBLogger } from '../../database.logger';
import { ErrorHandler } from '../../../common/handlers/error.handler';
import { LlmPromptsMapper } from '../../mapper/llm.prompts/llm.prompts.mapper';

export class LlmPromptsService  {
 
    // #region Repositories

    _llmPromptsRepository: Repository<LlmPrompts> = Source.getRepository(LlmPrompts);

    // #endregion

    public create = async (createModel: LlmPromptsCreateModel): Promise<LlmPromptsResponseDto> => {
        try {
            const LlmPrompts = this._llmPromptsRepository.create({
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
                CreatedAt         : createModel.CreatedAt,
            });
            var record = await this._llmPromptsRepository.save(LlmPrompts);
            return LlmPromptsMapper.toResponseDto(record);
        } catch (error) {
            DBLogger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

}

