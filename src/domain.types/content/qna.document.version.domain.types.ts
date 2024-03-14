/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { integer, uuid } from '../miscellaneous/system.types';
import { QnaDocumentLibraryResponseDto } from './qna.document.library.domain.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentVersionCreateModel {
    DocumentId: uuid;
    VersionNumber: number;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string;
}

export interface QnaDocumentVersionUpdateModel {
    DocumentId?: uuid;
    VersionNumber?: number;
    StorageUrl?: string;
    DownloadUrl?: string;
    FileResourceId?: string;
    Keywords?: string;
}

export interface QnaDocumentVersionResponseDto {
    DocumentId: uuid;
    id: string;
    VersionNumber: number;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface QnaDocumentVersionSearchFilters extends BaseSearchFilters {
    DocumentId?: uuid;
    id?: uuid;
    VersionNumber?: number;
    StorageUrl?: string;
    DownloadUrl?: string;
    FileResourceId?: string;
    Keywords?: string;
}

export interface QnaDocumentVersionSearchResults extends BaseSearchResults {
    Items: QnaDocumentVersionResponseDto[];
}
