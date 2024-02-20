import { LlmPrompts } from "../../models/llm.prompt/llm.prompts.model";
import { LlmPromptsDto } from "../../../domain.types/llm.prompt/llm.promps.domain.types";

export class LlmPromptsMapper {

    static toResponseDto = (llmprompts:LlmPrompts): LlmPromptsDto => {
        if (llmprompts == null) {
            return null;
        }
        const dto: LlmPromptsDto = {
            id                : LlmPrompts.id,
            Name              : LlmPrompts.Name,
            Description       : LlmPrompts.Description,
            UseCaseType       : LlmPrompts.UseCaseType,
            ModelName         : LlmPrompts.ModelName,
            ModelVersion      : LlmPrompts.ModelVersion,
            UserId            : LlmPrompts.UserId,
            Temperature       : LlmPrompts.Temperature,
            FrequencyPenality : LlmPrompts.FrequencyPenality,
            TopP              : LlmPrompts.TopP,
            PresencePenalty   : LlmPrompts.PresencePenalty,
            IsActive          : LlmPrompts.IsActive
        };
        return dto;
    };
    
}
