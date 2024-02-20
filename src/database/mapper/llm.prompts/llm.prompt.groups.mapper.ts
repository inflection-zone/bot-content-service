/* eslint-disable linebreak-style */
import { LlmPromptGroups } from "../../models/llm.prompt/llm.prompt.groups.model";
import { LlmPromptGroupsResponseDto } from "../../../domain.types/llm.prompt/llm.prompt.groups.domain.types";

export class LlmPromptGroupsMapper{

    static toResponseDto = (groups: LlmPromptGroups): LlmPromptGroupsResponseDto => {
        if (groups == null) {
            return null;
        }
        const dto: LlmPromptGroupsResponseDto = {
            id          : groups.id,
            Name        : groups.Name,
            Description : groups.Description ?? null,
         
        };
        return dto;
    };

}
