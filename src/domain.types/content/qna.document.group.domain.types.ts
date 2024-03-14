/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseSearchFilters, BaseSearchResults } from '../miscellaneous/base.search.types';
import { uuid } from '../miscellaneous/system.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentGroupCreateModel {
    Name: string;
    Description?: string;
}

export interface QnaDocumentGroupUpdateModel {
    Name?: string;
    Description?: string;
}

export interface QnaDocumentGroupResponseDto {
    id: uuid;
    Name: string;
    Description?: string;
    // QnaDocuments: string;

    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface QnaDocumentGroupSearchFilters extends BaseSearchFilters {
    id?: uuid;
    Name?: string;
    Description?: string;
    CreatedAt?: Date;
    UpdatedAt?: Date;
}

export interface QnaDocumentGroupSearchResults extends BaseSearchResults {
    Items: QnaDocumentGroupResponseDto[];
}
