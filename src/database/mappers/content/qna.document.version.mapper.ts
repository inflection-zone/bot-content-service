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
            // DocumentId: qnaDocumentVersion.DocumentId,
            StorageUrl: qnaDocumentVersion.StorageUrl,
            DownloadUrl: qnaDocumentVersion.DownloadUrl,
            FileResourceId: qnaDocumentVersion.FileResourceId,
            Keywords: qnaDocumentVersion.Keywords,
            CreatedAt: qnaDocumentVersion.CreatedAt,
            UpdatedAt: qnaDocumentVersion.UpdatedAt,
            QnaDocument: {
                id: qnaDocumentVersion.QnaDocument.id,
                Name: qnaDocumentVersion.QnaDocument.Name,
                Description: qnaDocumentVersion.QnaDocument.Description,
            },
        };
        return dto;
    };

    static toArrayDto(qnaDocumentVersion: QnaDocumentVersion[]): QnaDocumentVersionResponseDto[] {
        if (qnaDocumentVersion === null) {
            return null;
        }

        const dto: QnaDocumentVersionResponseDto[] = [];

        // qnaDocumentVersion.forEach((element) => {
        //     dto.push({
        for (let i = 0; i < qnaDocumentVersion.length; i++) {
            const element = qnaDocumentVersion[i];
            dto.push({
                id: element.id,
                VersionNumber: element.VersionNumber,
                // DocumentId: element.DocumentId,
                StorageUrl: element.StorageUrl,
                DownloadUrl: element.DownloadUrl,
                FileResourceId: element.FileResourceId,
                Keywords: element.Keywords,
                CreatedAt: element.CreatedAt,
                UpdatedAt: element.UpdatedAt,
                QnaDocument: {
                    id: element.QnaDocument.id,
                    Name: element.QnaDocument.Name,
                    Description: element.QnaDocument.Description,
                },
            });
        }
        return dto;
    }
}
