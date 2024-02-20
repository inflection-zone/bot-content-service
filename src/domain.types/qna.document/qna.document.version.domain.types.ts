import { uuid } from "../miscellaneous/system.types";

export interface  QnaDocumentVersionsDto {
    id              : uuid;
    VersionNumber   : string;
    StorageUrl      : string;
    DownloadUrl     : string;
    FileResourceId  : string;
    Keywords        : string[];
}
export interface  QnaDocumentVersionsCreateModel {
    VersionNumber   : string;
    StorageUrl      : string;
    DownloadUrl     : string;
    FileResourceId  : string;
    Keywords        : string[];
}
export interface  QnaDocumentVersionsUpdateModel {
    VersionNumber?  : string;
    StorageUrl?     : string;
    DownloadUrl?    : string;
    FileResourceId? : string;
    Keywords?       : string[];
}