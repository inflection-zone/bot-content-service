import { LlmPromptVersionsDto } from "../../../domain.types/llm.prompt/llm.prompt.versions.domain.types";
import { LlmPromptVersions } from "../../models/llm.prompt/llm.prompt.versions.model";

export class LlmPromptVersionsMapper {

    static toResponseDto = (llmpromptversion:LlmPromptVersions): LlmPromptVersionsDto => {
        if (llmpromptversion == null) {
            return null;
        }
        const dto: LlmPromptVersionsDto = {
            id            : LlmPromptVersions.id,
            VersionNumber : LlmPromptVersions.VersionNumber,
            Prompt        : LlmPromptVersions.Prompt,
            Variables     : LlmPromptVersions.Variables,
            Score         : LlmPromptVersions.Score,
            PublishedAt   : LlmPromptVersions.PublishedAt
        };
        return dto;
    };

}
