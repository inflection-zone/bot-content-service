import { uuid } from "../miscellaneous/system.types";

export interface  LlmPromptGroupsDto {
    id         : uuid;
    Name       : string;
    Description: string;
}
