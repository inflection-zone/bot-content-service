import { QnaLibrary } from "../../../database/models/qna.documents/qna.library.model";
import { QnaLibraryDto } from "../../../domain.types/qna.document/qna.document.libary.domain.types";

export class QnaDocumentLibraryMapper {

    static toResponseDto = (qnalibrary:QnaLibrary): QnaLibraryDto => {
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
