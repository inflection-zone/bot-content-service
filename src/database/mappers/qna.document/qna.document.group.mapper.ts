import { QnaDocumentGroupsDto } from "../../../domain.types/qna.document/qna.document.groups.domain.types";
import { QnaDocumentGroups } from "../../../database/models/qna.documents/qna.document.groups.model";

export class QnaDocumentGroupsMapper {

    static toResponseDto = (qnadocumentgroup: QnaDocumentGroups): QnaDocumentGroupsDto => {
        if (qnadocumentgroup == null) {
            return null;
        }
        const dto: QnaDocumentGroupsDto = {
            id          : QnaDocumentGroups.id,
            Name        : QnaDocumentGroups.Name,
            Description : QnaDocumentGroups.Description
            
        };
        return dto;
    };

}
