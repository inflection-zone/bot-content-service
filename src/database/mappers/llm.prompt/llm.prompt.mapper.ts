/* eslint-disable indent */
import { LlmPrompt } from "../../models/llm.prompt/llm.prompts.model";
import { LlmPromptDto } from "../../../domain.types/llm.prompt/llm.prompt.domain.types";
import { LlmPromptGroupMapper } from "./llm.prompt.groups.mapper";

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
            // eslint-disable-next-line max-len
            LlmPromptGroup    : LlmPromptGroupMapper.toResponseDto(llmprompts.LlmPromptGroups?.length > 0 ? llmprompts.LlmPromptGroups[0] : null),
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

    static toArrayDto (llmprompts:LlmPrompt[]): LlmPromptDto[] {
        if (llmprompts === null) {
            return null;
        }

        const dto: LlmPromptDto[] = [];

        llmprompts.forEach((element) => {
            dto.push({
                id                : element.id,
            Name              : element.Name,
            Description       : element.Description,
            UseCaseType       : element.UseCaseType,
            GroupName         : element.GroupName,
            ModelName         : element.ModelName,
            ModelVersion      : element.ModelVersion,
            UserId            : element.UserId,
            Temperature       : element.Temperature,
            FrequencyPenality : element.FrequencyPenality,
            TopP              : element.TopP,
            PresencePenalty   : element.PresencePenalty,
            IsActive          : element.IsActive
            });
        });
        return dto;
    }
    
}
