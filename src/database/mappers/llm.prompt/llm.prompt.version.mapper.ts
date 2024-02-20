import { LlmPromptVersionsDto } from "../../../domain.types/llm.prompt/llm.prompt.versions.domain.types";
import { LlmPromptVersions } from "../../models/llm.prompt/llm.prompt.versions.model";

export class LlmPromptVersionsMapper {

    static toResponseDto = (llmpromptversion:LlmPromptVersions): LlmPromptVersionsDto => {
        if (llmpromptversion == null) {
            return null;
        }
        const dto: LlmPromptVersionsDto = {
            id            : llmpromptversion.id,
            VersionNumber : llmpromptversion.VersionNumber,
            Prompt        : llmpromptversion.Prompt,
            Variables     : llmpromptversion.Variables,
            Score         : llmpromptversion.Score,
            PublishedAt   : llmpromptversion.PublishedAt
        };
        return dto;
    };

}
