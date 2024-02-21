/* eslint-disable @typescript-eslint/no-unused-vars */
import { integer, uuid } from '../miscellaneous/system.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentGroupCreateModel {
    Name: string;
    Description?: string;
    qna_documents: string;
}

export interface QnaDocumentGroupUpdateModel {
    Name?: string;
    Description?: string;
    qna_documents?: string;
}

export interface QnaDocumentGroupResponseDto {
    id: uuid;
    Name: string;
    Description?: string;
    QnaDocuments: string;

    CreatedAt: Date;
    UpdatedAt: Date;
}
