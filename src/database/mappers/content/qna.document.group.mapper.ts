/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { QnaDocumentGroupResponseDto } from '../../../domain.types/content/qna.document.group.domain.types';
import { QnaDocumentGroup } from '../../models/qna.document/qna.document.groups.model';

export class QnaDocumentGroupsMapper {
    static toResponseDto = (qnaDocumentGroups: QnaDocumentGroup): QnaDocumentGroupResponseDto => {
        if (qnaDocumentGroups == null) {
            return null;
        }
        const dto: QnaDocumentGroupResponseDto = {
            id: qnaDocumentGroups.id,
            Name: qnaDocumentGroups.Name,
            Description: qnaDocumentGroups.Description,

            CreatedAt: qnaDocumentGroups.CreatedAt,
            UpdatedAt: qnaDocumentGroups.UpdatedAt,
        };
        return dto;
    };
}
