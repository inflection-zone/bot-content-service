import { LlmPromptGroupsDto } from "../../../domain.types/llm.prompt/llm.prompt.groups.domain.types";
import { LlmPromptGroups } from "../../models/llm.prompt/llm.prompt.groups.model";
export class LlmPromptGroupsMapper {

    static toResponseDto = (llmpromptgroup: LlmPromptGroups): LlmPromptGroupsDto => {
        if (llmpromptgroup == null) {
            return null;
        }
        const dto: LlmPromptGroupsDto = {
            id          : llmpromptgroup.id,
            Name        : llmpromptgroup.Name,
            Description : llmpromptgroup.Description
            
        };
        return dto;
    };

}
