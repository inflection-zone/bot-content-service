import { LlmPromptVersionDto } from "../../../domain.types/llm.prompt/llm.prompt.version.domain.types";
import { LlmPromptVersion } from "../../models/llm.prompt/llm.prompt.versions.model";
import { LlmPromptMapper } from "./llm.prompt.mapper";

export class LlmPromptVersionMapper {

    static toResponseDto = (llmpromptversion:LlmPromptVersion): LlmPromptVersionDto => {
        if (llmpromptversion == null) {
            return null;
        }
        const prompt = LlmPromptMapper.toResponseDto(llmpromptversion.LlmPrompt);
        const dto: LlmPromptVersionDto = {
            id            : llmpromptversion.id,
            VersionNumber : llmpromptversion.VersionNumber,
            LlmPrompt     : prompt,
            Prompt        : llmpromptversion.Prompt,
            Variables     : llmpromptversion.Variables,
            Score         : llmpromptversion.Score,
            PublishedAt   : llmpromptversion.PublishedAt,
        };
        return dto;
    };

}
