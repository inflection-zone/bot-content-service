import { LlmPromptVersionDto } from "../../../domain.types/llm.prompt/llm.prompt.version.domain.types";
import { LlmPromptVersion } from "../../models/llm.prompt/llm.prompt.versions.model";

export class LlmPromptVersionMapper {

    static toResponseDto = (llmpromptversion:LlmPromptVersion): LlmPromptVersionDto => {
        if (llmpromptversion == null) {
            return null;
        }
        const dto: LlmPromptVersionDto = {
            id            : llmpromptversion.id,
            VersionNumber : llmpromptversion.VersionNumber,
            PromptId      : llmpromptversion.PromptId,
            Prompt        : llmpromptversion.Prompt,
            Variables     : llmpromptversion.Variables,
            Score         : llmpromptversion.Score,
            PublishedAt   : llmpromptversion.PublishedAt,
            
        };
        return dto;
    };

}
