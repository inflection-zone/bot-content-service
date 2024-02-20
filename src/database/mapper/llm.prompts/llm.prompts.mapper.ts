/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
import { LlmPrompts } from '../../models/llm.prompt/llm.prompts.model';
import {
    LlmPromptsResponseDto
} from '../../../domain.types/llm.prompt/llm.prompt.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class LlmPromptsMapper {

    static toResponseDto = (prompt: LlmPrompts): LlmPromptsResponseDto => {
        if (prompt == null) {
            return null;
        }
        const dto: LlmPromptsResponseDto = {
            PromptId      : prompt.PromptId,
            Name             : prompt.Name,
            Description       : prompt.Description ?? null,
            UserId            : prompt.UserId,
            UseCaseType       : prompt.UseCaseType,
            ModelName         : prompt.ModelName,
            ModelVersion      : prompt.ModelVersion,
            Temperature       : prompt.Temperature,
            FrequencyPenality : prompt.FrequencyPenality,
            TopP              : prompt.TopP,
            PresencePenalty   : prompt.PresencePenalty,
            IsActive          : prompt.IsActive,
            CreatedAt         : prompt.CreatedAt,
            UpdatedAt         : prompt.UpdatedAt,
        };
        return dto;
    };

}
