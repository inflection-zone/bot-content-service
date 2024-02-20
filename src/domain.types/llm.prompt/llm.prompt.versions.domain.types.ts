import { decimal } from "../miscellaneous/system.types";

export interface  LlmPromptVersionsDto {
    id: string;
    VersionNumber: string;
    Prompt: string;
    Variables: string;
    Score: decimal;
    PublishedAt: Date;
}
