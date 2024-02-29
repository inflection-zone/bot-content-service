import { LlmPrompt } from "../../models/llm.prompt/llm.prompts.model";
import { LlmPromptDto } from "../../../domain.types/llm.prompt/llm.prompt.domain.types";

export class LlmPromptMapper {

    static toResponseDto = (llmprompts:LlmPrompt): LlmPromptDto => {
        if (llmprompts == null) {
            return null;
        }
        const dto: LlmPromptDto = {
            id                : llmprompts.id,
            Name              : llmprompts.Name,
            Description       : llmprompts.Description,
            UseCaseType       : llmprompts.UseCaseType,
            GroupName         : llmprompts.GroupName,
            ModelName         : llmprompts.ModelName,
            ModelVersion      : llmprompts.ModelVersion,
            UserId            : llmprompts.UserId,
            Temperature       : llmprompts.Temperature,
            FrequencyPenality : llmprompts.FrequencyPenality,
            TopP              : llmprompts.TopP,
            PresencePenalty   : llmprompts.PresencePenalty,
            IsActive          : llmprompts.IsActive
        };
        return dto;
    };
    
}
