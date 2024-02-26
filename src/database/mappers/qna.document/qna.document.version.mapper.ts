import { QnaDocumentVersion } from "../../../database/models/qna.documents/qna.document.versions.model";
import { QnaDocumentVersionDto } from "../../../domain.types/qna.document/qna.document.version.domain.types";

export class QnaDocumentVersionMapper {

    static toResponseDto = (qnadocumentversion:QnaDocumentVersion): QnaDocumentVersionDto => {
        if (qnadocumentversion == null) {
            return null;
        }
        const dto: QnaDocumentVersionDto = {
            id             : qnadocumentversion.id,
            VersionNumber  : qnadocumentversion.VersionNumber,
            StorageUrl     : qnadocumentversion.StorageUrl,
            DownloadUrl    : qnadocumentversion.DownloadUrl,
            FileResourceId : qnadocumentversion.FileResourceId,
            Keywords       : qnadocumentversion.Keywords,
        };
        return dto;
    };

}
