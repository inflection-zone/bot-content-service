import { LlmPromptVersionDto } from "../../../domain.types/llm.prompt/llm.prompt.version.domain.types";
import { LlmPromptVersion } from "../../models/llm.prompt/llm.prompt.versions.model";
import { LlmPromptMapper } from "./llm.prompt.mapper";

export class LlmPromptVersionMapper {

    static toResponseDto = (llmpromptversion:LlmPromptVersion): LlmPromptVersionDto => {
        if (llmpromptversion == null) {
            return null;
        }
        var variables = [];
        if (llmpromptversion.Variables !== null && llmpromptversion.Variables !== undefined) {
            variables = JSON.parse(llmpromptversion.Variables);
        }
        const prompt = LlmPromptMapper.toResponseDto(llmpromptversion.LlmPrompts);
        const dto: LlmPromptVersionDto = {
            id            : llmpromptversion.id,
            VersionNumber : llmpromptversion.VersionNumber,
            LlmPrompt     : prompt,
            Prompt        : llmpromptversion.Prompt,
            Variables     : variables,
            // Variables     : NodeType,
            Score         : llmpromptversion.Score,
            PublishedAt   : llmpromptversion.PublishedAt,
        };
        return dto;
    };

}
