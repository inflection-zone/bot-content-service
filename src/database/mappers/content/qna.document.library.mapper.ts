/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { QnaDocumentLibraryResponseDto } from '../../../domain.types/content/qna.document.library.domain.types';

import { QnaDocumentLibrary } from '../../models/qna.document/qna.document.library.model';

export class QnaDocumentLibraryMapper {
    static toResponseDto = (qnaDocumentLibrary: QnaDocumentLibrary): QnaDocumentLibraryResponseDto => {
        if (qnaDocumentLibrary == null) {
            return null;
        }
        const dto: QnaDocumentLibraryResponseDto = {
            id: qnaDocumentLibrary.id,
            DocumentId: qnaDocumentLibrary.DocumentId,
           
        };
        return dto;
    };
}
