/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { LlmPromptVersions } from "../../models/llm.prompt/llm.prompt.versions.model";
import { LlmPromptVersionsResponseDto
} from "../../../domain.types/llm.prompt/llm.prompt.versions.domain.types";

export class LlmPromptVersionsMapper{

    static toResponseDto = (version: LlmPromptVersions): LlmPromptVersionsResponseDto => {
        if (version == null) {
       return null;
   }
   const dto: LlmPromptVersionsResponseDto = {
    VersionId     : version.id,
    VersionNumber : version.VersionNumber,
    Prompt        : version.Prompt,
    Variables     : version.Variables,
    Score         : version.Score,
    PublishedAt   : version.PublishedAt,
   };
   return dto;
  };
 
}
