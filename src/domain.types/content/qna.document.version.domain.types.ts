import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { decimal } from '../miscellaneous/system.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentVersionCreateModel {
    VersionNumber: string;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string[];
    QnaDocumentId: string;
}

export interface QnaDocumentVersionUpdateModel {
    VersionNumber?: string;
    StorageUrl?: string;
    DownloadUrl?: string;
    FileResourceId?: string;
    Keywords?: string[];
    QnaDocumentId: string;
}

export interface QnaDocumentVersionResponseDto {
    id: string;
    VersionNumber: string;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string[];
    CreatedAt: Date;
    UpdatedAt: Date;
    QnaDocumentId: {
        id: string;
        Name: string;
        Description: string;
        FileName: string;
        Source: string;
        ParentDocument: string;
        ParentDocumentVersion: string;
        ChunkingStrategy: string;
        ChunkingLength: decimal;
        ChunkOverlap: decimal;
        Splitter: string;
        IsActive: boolean;
        CreatedBy: string;
    };
}

export interface QnaDocumentVersionSearchFilters extends BaseSearchFilters {
    versionNumber?: string;
    storageUrl?: string;
    downloadUrl?: string;
    fileResourceId?: string;
    keywords?: string[];
    qnaDocumentId?: string;
}

export interface QnaDocumentVersionSearchResults extends BaseSearchResults {
    Items: QnaDocumentVersionSearchResponseDto[];
}

export interface QnaDocumentVersionSearchResponseDto {
    id: string;
    VersionNumber: string;
    StorageUrl: string;
    DownloadUrl: string;
    FileResourceId: string;
    Keywords: string[];
    CreatedAt: Date;
    UpdatedAt: Date;
}
