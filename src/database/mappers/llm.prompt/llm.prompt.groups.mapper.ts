import { LlmPromptGroupsDto } from "../../../domain.types/llm.prompt/llm.prompt.groups.domain.types";
import { LlmPromptGroup } from "../../models/llm.prompt/llm.prompt.groups.model";
export class LlmPromptGroupsMapper {

    static toResponseDto = (llmpromptgroup: LlmPromptGroup): LlmPromptGroupsDto => {
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
