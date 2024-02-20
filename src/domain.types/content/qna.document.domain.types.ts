import { integer, uuid } from '../miscellaneous/system.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentGroupCreateModel {
   
    Name: string;
    Description: string;
    Filename: string;
    Source: string;
    ParentDocument?: string;
    ParentDocumentVersion?: string;
    ChunkingStrategy?: string;
    ChunkingLenght?: integer;
    ChunkOverlap?: integer;
    Splitter?: string;
    IsActive?: boolean;
    CreatedBy: string;
   
}

export interface QnaDocumentGroupUpdateModel {
    
    Name?: string;
    Description?: string;
    Filename?: string;
    Source?: string;
    ParentDocument?: string;
    ParentDocumentVersion?: string;
    ChunkingStrategy?: string;
    ChunkingLenght?: integer;
    ChunkOverlap?: integer;
    Splitter?: string;
    IsActive?: boolean;
    CreatedBy?: string;
    
}

export interface QnaDocumentGroupResponseDto {
    id: uuid;
    Name: string;
    Description: string;
    Filename: string;
    Source: string;
    ParentDocument: string;
    ParentDocumentVersion: string;
    ChunkingStrategy: string;
    ChunkingLenght: integer;
    ChunkOverlap: integer;
    Splitter: string;
    IsActive: boolean;
    CreatedBy: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
