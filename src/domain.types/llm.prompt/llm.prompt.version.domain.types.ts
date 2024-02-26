import { BaseSearchFilters } from "../miscellaneous/base.search.types";
import { decimal, uuid } from "../miscellaneous/system.types";

export interface  LlmPromptVersionDto {
    id              : uuid;
    VersionNumber   : string;
    // PromptId        : string;
    Prompt          : string;
    Variables       : string;
    Score           : decimal;
    PublishedAt     : Date;
}
export interface  LlmPromptVersionCreateModel {
    VersionNumber   : string;
    PromptId        : uuid;
    Prompt          : string;
    Variables       : string;
    Score           : decimal;
    PublishedAt     : Date;
}
export interface  LlmPromptVersionUpdateModel {
    VersionNumber?  : string;
    PromptId        : uuid;
    Prompt?         : string;
    Variables?      : string;
    Score?          : decimal;
    PublishedAt?    : Date
}
export interface LlmPromptVersionSearchFilters extends BaseSearchFilters {
    VersionNumber?  : string;
    PromptId?        : uuid;
    Prompt?         : string;
    Variables?      : string;
    Score?          : decimal;
    PublishedAt?    : Date;
}
