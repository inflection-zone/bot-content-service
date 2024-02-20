import { QnaDocumentVersions } from "../../../database/models/qna.documents/qna.document.versions.model";
import { QnaDocumentVersionsDto } from "../../../domain.types/qna.document/qna.document.version.domain.types";

export class QnaDocumentVersionsMapper {

    static toResponseDto = (qnadocumentversion:QnaDocumentVersions): QnaDocumentVersionsDto => {
        if (qnadocumentversion == null) {
            return null;
        }
        const dto: QnaDocumentVersionsDto = {
            id             : QnaDocumentVersions.id,
            VersionNumber  : QnaDocumentVersions.VersionNumber,
            StorageUrl     : QnaDocumentVersions.StorageUrl,
            DownloadUrl    : QnaDocumentVersions.DownloadUrl,
            FileResourceId : QnaDocumentVersions.FileResourceId,
            Keywords       : QnaDocumentVersions.Keywords,
        };
        return dto;
    };

}
