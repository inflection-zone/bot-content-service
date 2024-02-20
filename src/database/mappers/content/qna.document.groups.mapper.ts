import { QnaDocumentGroupResponseDto } from '../../../domain.types/content/qna.document.groups.domain.types';
import { QnaDocumentGroups } from '../../../database/models/qna.documents/qna.document.groups.model';

export class QnaDocumentGroupsMapper {
    static toResponseDto = (qnaDocumentGroups: QnaDocumentGroups): QnaDocumentGroupResponseDto => {
        if (qnaDocumentGroups == null) {
            return null;
        }
        const dto: QnaDocumentGroupResponseDto = {
            id: qnaDocumentGroups.id,
            Name: qnaDocumentGroups.Name,
            Description: qnaDocumentGroups.Description,
            qna_documents: qnaDocumentGroups.qna_documents,

            CreatedAt: qnaDocumentGroups.CreatedAt,
            UpdatedAt: qnaDocumentGroups.UpdatedAt,
        };
        return dto;
    };
}
