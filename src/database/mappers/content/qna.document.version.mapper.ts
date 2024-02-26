/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
import { QnaDocumentVersionResponseDto } from '../../../domain.types/content/qna.document.version.domain.types';

import { QnaDocumentVersion } from '../../models/qna.document/qna.document.version.model';

export class QnaDocumentVersionMapper {
    static toResponseDto = (qnaDocumentVersion: QnaDocumentVersion): QnaDocumentVersionResponseDto => {
        if (qnaDocumentVersion == null) {
            return null;
        }
        const dto: QnaDocumentVersionResponseDto = {
            id: qnaDocumentVersion.id,
            VersionNumber: qnaDocumentVersion.VersionNumber,
            StorageUrl: qnaDocumentVersion.StorageUrl,
            DownloadUrl: qnaDocumentVersion.DownloadUrl,
            FileResourceId: qnaDocumentVersion.FileResourceId,
            Keywords: qnaDocumentVersion.Keywords,
            CreatedAt: qnaDocumentVersion.CreatedAt,
            UpdatedAt: qnaDocumentVersion.UpdatedAt,
        };
        return dto;
    };
}
