import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import { decimal, uuid } from "../miscellaneous/system.types";

export interface  LlmPromptCreateModel {
    Name              : string;
    Description?      : string;
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
}
export interface LlmPromptUpdateModel {
    Name?              : string;
    Description?       : string;
    UseCaseType?       : string;
    GroupName?      : string;
    ModelName?         : string;
    ModelVersion?      : string;
    UserId?            : string;
    Temperature?       : decimal;
    FrequencyPenality? : decimal;
    TopP?              : decimal;
    PresencePenalty?   : decimal;
    IsActive?          : boolean;
}
export interface LlmPromptDto {
    id                : uuid;
    Name              : string;
    Description       : string;
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
}
export interface LlmPromptSearchFilters extends BaseSearchFilters {
    id?                : uuid;
    Name?               : string;
    UseCaseType?        : string;
    GroupName?          : string;
    ModelName?          : string;
    ModelVersion?       : string;
    UserId?             : string;
    Temperature?        : decimal;
    FrequencyPenality?  : decimal;
    TopP?               : decimal;
    PresencePenalty?    : decimal;
    IsActive?           : boolean;
}
export interface LlmPromptSearchResults extends BaseSearchResults {
    Items: LlmPromptDto[];
}
