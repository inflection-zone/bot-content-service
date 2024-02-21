import { BaseSearchFilters } from "../miscellaneous/base.search.types";
import { decimal, uuid } from "../miscellaneous/system.types";

export interface  LlmPromptsCreateModel {
    Name              : string;
    Description?      : string;
    UseCaseType       : string;
    ModelName         : string;
    ModelVersion      : string;
    UserId            : string;
    Temperature       : decimal;
    FrequencyPenality : decimal;
    TopP              : decimal;
    PresencePenalty   : decimal;
    IsActive          : boolean;
}
export interface LlmPromptsUpdateteModel {
    Name?              : string;
    Description?       : string;
    UseCaseType?       : string;
    ModelName?         : string;
    ModelVersion?      : string;
    UserId?            : string;
    Temperature?       : decimal;
    FrequencyPenality? : decimal;
    TopP?              : decimal;
    PresencePenalty?   : decimal;
    IsActive?          : boolean;
}
export interface LlmPromptsDto {
    id                : uuid;
    Name              : string;
    Description       : string;
    UseCaseType       : string;
    ModelName         : string;
    ModelVersion      : string;
    UserId            : string;
    Temperature       : decimal;
    FrequencyPenality : decimal;
    TopP              : decimal;
    PresencePenalty   : decimal;
    IsActive          : boolean;
}
export interface LlmPrompSearchFilters extends BaseSearchFilters {
    id?                : uuid;
    Name?              : string;
    UseCaseType?       : string;
    ModelName?         : string;
    ModelVersion?      : string;
    UserId?            : string;
    IsActive?          : boolean;
}
