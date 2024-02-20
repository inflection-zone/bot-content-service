import { uuid } from "../miscellaneous/system.types";

export interface  LlmPromptGroupsDto {
    id         : uuid;
    Name       : string;
    Description: string;
}

export interface  LlmPromptGroupsCreateModel {
    Name        : string;
    Description?: string
}

export interface  LlmPromptGroupsUpdateModel {
    Name?       : string;
    Description?: string
    }