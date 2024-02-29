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
