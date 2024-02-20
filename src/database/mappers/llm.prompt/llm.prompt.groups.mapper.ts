import { LlmPromptGroupsDto } from "../../../domain.types/llm.prompt/llm.prompt.groups.domain.types";
import { LlmPromptGroups } from "../../models/llm.prompt/llm.prompt.groups.model";
export class LlmPromptGroupsMapper {

    static toResponseDto = (llmpromptgroup: LlmPromptGroups): LlmPromptGroupsDto => {
        if (llmpromptgroup == null) {
            return null;
        }
        const dto: LlmPromptGroupsDto = {
            id          : LlmPromptGroups.id,
            Name        : LlmPromptGroups.Name,
            Description : LlmPromptGroups.Description
            
        };
        return dto;
    };

}
