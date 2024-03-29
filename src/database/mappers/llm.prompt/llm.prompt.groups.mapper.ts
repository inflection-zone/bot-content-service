import { LlmPromptGroupDto } from "../../../domain.types/llm.prompt/llm.prompt.group.domain.types";
import { LlmPromptGroup } from "../../models/llm.prompt/llm.prompt.groups.model";
import { LlmPromptMapper } from "./llm.prompt.mapper";
export class LlmPromptGroupMapper {

    static toResponseDto = (llmpromptgroup: LlmPromptGroup): LlmPromptGroupDto => {
        if (llmpromptgroup == null) {
            return null;
        }
        const dto: LlmPromptGroupDto = {
            id          : llmpromptgroup.id,
            Name        : llmpromptgroup.Name,
            Description : llmpromptgroup.Description,
            // eslint-disable-next-line max-len
            LlmPrompt   : LlmPromptMapper.toResponseDto(llmpromptgroup.LlmPrompts?.length > 0 ? llmpromptgroup.LlmPrompts[0] : null),
            
        };
        return dto;
    };

}
