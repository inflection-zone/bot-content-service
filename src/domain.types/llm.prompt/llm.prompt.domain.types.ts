/* eslint-disable linebreak-style */
import { BaseSearchFilters, BaseSearchResults } from "../miscellaneous/base.search.types";
import {
    decimal,
    uuid
} from "../miscellaneous/system.types";

//////////////////////////////////////////////////////////////

export interface LlmPromptsCreateModel {
 PromptId          : uuid;
 UserId            : uuid;
 Name              : string;
 Description       : string;
 UseCaseType       : string;
 ModelName         : string;
 ModelVersion      : string;
 Temperature       : decimal;
 FrequencyPenality : decimal;
 TopP              : decimal;
 PresencePenalty   : string;
 IsActive          : boolean;
 CreatedAt         : Date,
}

export interface LlmPromptsResponseDto {
 PromptId          : uuid;
 UserId            : uuid;
 Name              : string;
 Description       : string;
 UseCaseType       : string;
 ModelName         : string;
 ModelVersion      : string;
 Temperature       : decimal;
 FrequencyPenality : decimal;
 TopP              : decimal;
 PresencePenalty   : decimal;
 IsActive          : boolean;
 CreatedAt         : Date;
 UpdatedAt         : Date;
}

export interface LlmPromptsUpdateModel {
 PromptId?          : uuid;
 UserId?            : uuid;
 Name?              : string;
 Description?       : string;
 UseCaseType?       : string;
 ModelName?         : string;
 ModelVersion?      : string;
 Temperature?       : decimal;
 FrequencyPenality? : decimal;
 TopP?              : decimal;
 PresencePenalty?   : string;
 IsActive?          : boolean;
}

export interface LlmPromptsSearchFilters extends BaseSearchFilters {
    Name ?       : string;
    PromptId ? : uuid;
}

export interface BadgeSearchResults extends BaseSearchResults {
    Items: LlmPromptsResponseDto[];
}
