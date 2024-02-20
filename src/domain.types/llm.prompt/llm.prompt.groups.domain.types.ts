/* eslint-disable linebreak-style */
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    uuid
} from "../miscellaneous/system.types";

//////////////////////////////////////////////////////////////

export interface LlmPromptGroupsCreateModel {
 GroupId     : uuid;
 Name         : string;
 Description? : string;
 
}

export interface LlmPromptGroupsUpdateModel {
 GroupId?    : uuid;
 Name?        : string;
 Description? : string;

}

export interface LlmPromptGroupsResponseDto {
 id         : uuid;
 Name       : string;
 Description: string;
}

export interface LlmPromptGroupsSearchFilters extends BaseSearchFilters {
 Name ?       : string;
 GroupId ?   : uuid;
}

export interface LlmPromptGroupsSearchResults extends BaseSearchResults {
 Items: LlmPromptGroupsResponseDto[];
}
