import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { decimal, uuid } from "../miscellaneous/system.types";

export interface  LlmPromptVersionDto {
    id              : uuid;
    VersionNumber   : string;
    LlmPrompt?:{
        id  : uuid;
        Name             : string;
        Description      : string;
        UseCaseType       : string;
        GroupName         : string;
        ModelName         : string;
        ModelVersion      : string;
    };
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
    PublishedAt?     : Date;
}
export interface  LlmPromptVersionUpdateModel {
    VersionNumber?  : string;
    PromptId?        : uuid;
    Prompt?         : string;
    Variables?      : string;
    Score?          : decimal;
    PublishedAt?    : Date
}
export interface LlmPromptVersionSearchFilters extends BaseSearchFilters {
    VersionNumber?  : string;
    PromptId?       :uuid;
    Prompt?         : string;
    Variables?      : string;
    Score?          : decimal;
    PublishedAt?    : Date;
}
export interface LlmPromptVersionSearchResults extends BaseSearchResults {
    Items: LlmPromptVersionDto[];
}
