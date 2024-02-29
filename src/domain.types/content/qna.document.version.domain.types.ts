/* eslint-disable @typescript-eslint/no-unused-vars */
import { integer } from '../miscellaneous/system.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentVersionCreateModel {
    VersionNumber: integer;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string;
}

export interface QnaDocumentVersionUpdateModel {
    VersionNumber?: integer;
    StorageUrl?: string;
    DownloadUrl?: string;
    FileResourceId?: string;
    Keywords?: string;
}

export interface QnaDocumentVersionResponseDto {
    id: string;
    VersionNumber: integer;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
