import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { decimal, uuid } from '../miscellaneous/system.types';

import { QnaDocumentGroupResponseDto } from './qna.document.group.domain.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentCreateModel {
    Name: string;
    Description?: string;
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
    ResourceId? :string;
}

export interface QnaDocumentUpdateModel {
    Name?: string;
    Description?: string;
    FileName?: string;
    Source?: string;
    ParentDocument?: string;
    ParentDocumentVersion?: string;
    ChunkingStrategy?: string;
    ChunkingLength?: decimal;
    ChunkOverlap?: decimal;
    Splitter?: string;
    IsActive?: boolean;
    CreatedBy?: string;
    ResourceId? :string;
}

export interface QnaDocumentResponseDto {
    id: uuid;
    Name: string;
    Description: string;
    FileName: string;
    QnaDocumentGroup?: QnaDocumentGroupResponseDto;
    Source: string;
    ParentDocument: string;
    ParentDocumentVersion: string;
    ChunkingStrategy: string;
    ChunkingLength: decimal;
    ChunkOverlap: decimal;
    Splitter: string;
    IsActive: boolean;
    CreatedBy: string;
    ResourceId? : any;
}

export interface QnaDocumentSearchFilters extends BaseSearchFilters {
    id?: uuid;
    name?: string;
    description?: string;
    fileName?: string;
    source?: string;
    parentDocument?: string;
    parentDocumentVersion?: string;
    chunkingStrategy?: string;
    chunkingLength?: decimal;
    chunkOverlap?: decimal;
    splitter?: string;
    isActive?: boolean;
    createdBy?: string;
}
export interface QnaDocumentSearchResults extends BaseSearchResults {
    id?: uuid;
    Name?: string;
}
