import { LlmPromptVersionsDto } from "../../../domain.types/llm.prompt/llm.prompt.versions.domain.types";
import { LlmPromptVersion } from "../../models/llm.prompt/llm.prompt.versions.model";

export class LlmPromptVersionsMapper {

    static toResponseDto = (llmpromptversion:LlmPromptVersion): LlmPromptVersionsDto => {
        if (llmpromptversion == null) {
            return null;
        }
        const dto: LlmPromptVersionsDto = {
            id            : llmpromptversion.id,
            VersionNumber : llmpromptversion.VersionNumber,
            // PromptId      : llmpromptversion.PromptId,
            Prompt        : llmpromptversion.Prompt,
            Variables     : llmpromptversion.Variables,
            Score         : llmpromptversion.Score,
            PublishedAt   : llmpromptversion.PublishedAt,
            
        };
        return dto;
    };

}
