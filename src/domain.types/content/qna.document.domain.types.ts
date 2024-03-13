import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { integer, uuid } from '../miscellaneous/system.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentCreateModel {
    Name: string;
    Description: string;
    FileName: string;
    Source: string;
    ParentDocument?: string;
    ParentDocumentVersion?: integer;
    ChunkingStrategy?: string;
    ChunkingLenght?: integer;
    ChunkOverlap?: integer;
    Splitter?: string;
    IsActive?: boolean;
    CreatedBy: string;
}

export interface QnaDocumentUpdateModel {
    Name?: string;
    Description?: string;
    FileName?: string;
    Source?: string;
    ParentDocument?: string;
    ParentDocumentVersion?: integer;
    ChunkingStrategy?: string;
    ChunkingLenght?: integer;
    ChunkOverlap?: integer;
    Splitter?: string;
    IsActive?: boolean;
    CreatedBy?: string;
}

export interface QnaDocumentResponseDto {
    id: uuid;
    Name: string;
    Description: string;
    FileName: string;
    Source: string;
    ParentDocument: string;
    ParentDocumentVersion: integer;
    ChunkingStrategy: string;
    ChunkingLenght: integer;
    ChunkOverlap: integer;
    Splitter: string;
    IsActive: boolean;
    CreatedBy: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface QnaDocumentSearchFilters extends BaseSearchFilters {
    id?: uuid;
    Name?: string;
    Description?: string;
    FileName?: string;
    Source?: string;
    ParentDocument?: string;
    ParentDocumentVersion?: integer;
    ChunkingStrategy?: string;
    ChunkingLenght?: integer;
    ChunkOverlap?: integer;
    Splitter?: string;
    IsActive?: boolean;
    CreatedBy?: string;
}
export interface QnaDocumentSearchResults extends BaseSearchResults {
    Items: QnaDocumentResponseDto[];
}
