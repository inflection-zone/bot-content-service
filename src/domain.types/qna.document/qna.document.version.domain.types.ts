import { BaseSearchFilters } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface  QnaDocumentVersionDto {
    id              : uuid;
    VersionNumber   : number;
    StorageUrl      : string;
    DownloadUrl     : string;
    FileResourceId  : string;
    Keywords        : string;
}
export interface  QnaDocumentVersionCreateModel {
    VersionNumber   : number;
    StorageUrl      : string;
    DownloadUrl     : string;
    FileResourceId  : string;
    Keywords        : string;
}
export interface  QnaDocumentVersionUpdateModel {
    VersionNumber?  : number;
    StorageUrl?     : string;
    DownloadUrl?    : string;
    FileResourceId? : string;
    Keywords?       : string;
}
export interface LlmPromptVersionSearchFilters extends BaseSearchFilters {
    VersionNumber?  : string;
    StorageUrl?     : string;
    DownloadUrl?    : string;
    FileResourceId? : string;
    Keywords?       : string;
}
