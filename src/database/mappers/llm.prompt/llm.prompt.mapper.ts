import { LlmPrompts } from "../../models/llm.prompt/llm.prompts.model";
import { LlmPromptsDto } from "../../../domain.types/llm.prompt/llm.prompts.domain.types";

export class LlmPromptsMapper {

    static toResponseDto = (llmprompts:LlmPrompts): LlmPromptsDto => {
        if (llmprompts == null) {
            return null;
        }
        const dto: LlmPromptsDto = {
            id                : llmprompts.id,
            Name              : llmprompts.Name,
            Description       : llmprompts.Description,
            UseCaseType       : llmprompts.UseCaseType,
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
