import { decimal, uuid } from "../miscellaneous/system.types";

export interface  LlmPromptVersionsDto {
    id              : uuid;
    VersionNumber   : string;
    // PromptId        : string;
    Prompt          : string;
    Variables       : string;
    Score           : decimal;
    PublishedAt     : Date;
}
export interface  LlmPromptVersionsCreateModel {
    VersionNumber   : string;
    PromptId        : uuid;
    Prompt          : string;
    Variables       : string;
    Score           : decimal;
    PublishedAt     : Date
}
export interface  LlmPromptVersionsUpdateModel {
    VersionNumber?  : string;
    PromptId        : uuid;
    Prompt?         : string;
    Variables?      : string;
    Score?          : decimal;
    PublishedAt?    : Date
}
