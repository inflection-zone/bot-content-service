/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { QnaDocumentResponseDto } from '../../../domain.types/content/qna.document.domain.types';
import { QnaDocument } from '../../models/qna.document/qna.document.model';

export class QnaDocumentMapper {
    static toResponseDto = (qnaDocument: QnaDocument): QnaDocumentResponseDto => {
        if (qnaDocument == null) {
            return null;
        }
        const dto: QnaDocumentResponseDto = {
            id: qnaDocument.id,
            Name: qnaDocument.Name,
            Description: qnaDocument.Description,
            Filename: qnaDocument.Filename,
            Source: qnaDocument.Source,
            ParentDocument: qnaDocument.ParentDocument,
            ParentDocumentVersion: qnaDocument.ParentDocumentVersion,
            ChunkingStrategy: qnaDocument.ChunkingStrategy,
            ChunkingLenght: qnaDocument.ChunkingLenght,
            ChunkOverlap: qnaDocument.ChunkOverlap,
            Splitter: qnaDocument.Splitter,
            IsActive: qnaDocument.IsActive,
            CreatedBy: qnaDocument.CreatedBy,
            CreatedAt: qnaDocument.CreatedAt,
            UpdatedAt: qnaDocument.UpdatedAt,
        };
        return dto;
    };
}
