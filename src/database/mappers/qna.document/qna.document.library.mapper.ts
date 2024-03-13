import { QnaDocumentLibrary } from "../../../database/models/qna.document/qna.document.library.model";
import { QnaLibraryDto } from "../../../domain.types/qna.document/qna.document.library.domain.types";

export class QnaDocumentLibraryMapper {

    static toResponseDto = (qnalibrary:QnaDocumentLibrary): QnaLibraryDto => {
        if (qnalibrary == null) {
            return null;
        }
        const dto: QnaLibraryDto = {
            id         : qnalibrary.id,
            DocumentId : qnalibrary.DocumentId
        };
        return dto;
    };

}