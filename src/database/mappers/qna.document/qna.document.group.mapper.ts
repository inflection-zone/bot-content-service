import { QnaDocumentGroupDto } from "../../../domain.types/qna.document/qna.document.group.domain.types";
import { QnaDocumentGroup } from "../../../database/models/qna.document/qna.document.groups.model";

export class QnaDocumentGroupMapper {

    static toResponseDto = (qnadocumentgroup: QnaDocumentGroup): QnaDocumentGroupDto => {
        if (qnadocumentgroup == null) {
            return null;
        }
        const dto: QnaDocumentGroupDto = {
            id          : qnadocumentgroup.id,
            Name        : qnadocumentgroup.Name,
            Description : qnadocumentgroup.Description
            
        };
        return dto;
    };

}
