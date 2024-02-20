import {
    integer,
    uuid
} from "../miscellaneous/system.types";

//////////////////////////////////////////////////////////////

export interface QnaDocumentGroupCreateModel {
    
    VersionNumber: integer;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string;
    
}

export interface QnaDocumentGroupUpdateModel {
   
    VersionNumber?: integer;
    StorageUrl?: string;
    DownloadUrl?: string;
    FileResourceId?: string;
    Keywords?: string;
    
}

export interface QnaDocumentGroupResponseDto {
    id: string;
    VersionNumber: integer;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string;
    CreatedAt: Date
    UpdatedAt: Date;
    
}