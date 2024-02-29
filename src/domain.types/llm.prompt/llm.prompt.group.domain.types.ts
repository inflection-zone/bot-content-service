import { BaseSearchFilters } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface  LlmPromptGroupDto {
    id?         : uuid;
    Name?       : string;
    Description?: string;
}

export interface  LlmPromptGroupCreateModel {
    Name        : string;
    Description?: string;
}

export interface  LlmPromptGroupUpdateModel {
    Name?       : string;
    Description?: string;
}
export interface  LlmPromptGroupSearchModel {
    id?         :string
    Name?       : string;
    Description?: string;
}

export interface LlmPromptGroupSearchFilters extends BaseSearchFilters {
        id?                : uuid;
        Name?              : string;

}
