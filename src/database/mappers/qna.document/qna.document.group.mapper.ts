import { QnaDocumentGroupsDto } from "../../../domain.types/qna.document/qna.document.groups.domain.types";
import { QnaDocumentGroup } from "../../../database/models/qna.documents/qna.document.groups.model";

export class QnaDocumentGroupsMapper {

    static toResponseDto = (qnadocumentgroup: QnaDocumentGroup): QnaDocumentGroupsDto => {
        if (qnadocumentgroup == null) {
            return null;
        }
        const dto: QnaDocumentGroupsDto = {
            id          : qnadocumentgroup.id,
            Name        : qnadocumentgroup.Name,
            Description : qnadocumentgroup.Description
            
        };
        return dto;
    };

}
