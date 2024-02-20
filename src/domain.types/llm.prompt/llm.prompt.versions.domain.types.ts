/* eslint-disable linebreak-style */
import {
    BaseSearchFilters,
    BaseSearchResults
} from "../miscellaneous/base.search.types";
import {
    decimal,
    uuid
} from "../miscellaneous/system.types";

//////////////////////////////////////////////////////////////

export interface LlmPromptVersionsCreateModel {
VersionId     : uuid;
VersionNumber : string;
Prompt        : string;
Variables     : string;
Score         : decimal;
PublishedAt   : Date;

}

export interface LlmPromptVersionsUpdateModel {
 VersionId      : uuid;
 VersionNumber? : string;
 Prompt?        : string;
 Variables?     : string;
 Score?         : decimal;
 PublishedAt?   : Date;

}

export interface LlmPromptVersionsResponseDto {
 VersionId     : uuid;
 VersionNumber : string;
 Prompt        : string;
 Variables     : string;
 Score         : decimal;
 PublishedAt   : Date;
 
}

export interface LlmPromptVersionsSearchFilters extends BaseSearchFilters {
Name ?       : string;
GroupId ?   : uuid;
}

export interface LlmPromptVersionsSearchResults extends BaseSearchResults {
Items: LlmPromptVersionsResponseDto[];
}
