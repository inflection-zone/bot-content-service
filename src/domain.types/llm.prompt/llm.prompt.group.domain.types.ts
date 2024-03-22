import { BaseSearchFilters } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";
import { LlmPromptDto } from "./llm.prompt.domain.types";

export interface  LlmPromptGroupDto {
    id?         : uuid;
    Name?       : string;
    Description?: string;
    LlmPrompt      ?: LlmPromptDto;
}

export interface  LlmPromptGroupCreateModel {
    PromptId    : string;
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
