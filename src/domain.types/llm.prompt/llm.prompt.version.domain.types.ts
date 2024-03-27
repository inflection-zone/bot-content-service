import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { decimal, uuid } from "../miscellaneous/system.types";

export interface  LlmPromptVersionDto {
    id              : uuid;
    VersionNumber   : string;
    llm_prompts?:{
        id  : uuid;
        Name             : string;
        Description      : string;
        UseCaseType       : string;
        GroupName         : string;
        ModelName         : string;
        ModelVersion      : string;
        UserId            : string;
        Temperature       : decimal;
        FrequencyPenality : decimal;
        TopP              : decimal;
        PresencePenalty   : decimal;
        IsActive          : boolean;
    };
    PromptId?       : uuid;
    Prompt          : string;
    Variables       : string;
    Score           : decimal;
    PublishedAt     : Date;
}
export interface  LlmPromptVersionCreateModel {
    VersionNumber   : string;
    llm_prompts?:{
        id  : uuid;
        Name             : string;
        Description      : string;
        UseCaseType       : string;
        GroupName         : string;
        ModelName         : string;
        ModelVersion      : string;
        UserId            : string;
        Temperature       : decimal;
        FrequencyPenality : decimal;
        TopP              : decimal;
        PresencePenalty   : decimal;
        IsActive          : boolean;
    };
    PromptId        : uuid;
    Prompt          : string;
    Variables       : string;
    Score           : decimal;
    PublishedAt?     : Date;
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
    PromptId?       :uuid;
    Prompt?         : string;
    Variables?      : string;
    Score?          : decimal;
    PublishedAt?    : Date;
}
export interface LlmPromptVersionSearchResults extends BaseSearchResults {
    Items: LlmPromptVersionDto[];
}
