import { QnaDocumentVersions } from "../../../database/models/qna.documents/qna.document.versions.model";
import { QnaDocumentVersionsDto } from "../../../domain.types/qna.document/qna.document.version.domain.types";

export class QnaDocumentVersionsMapper {

    static toResponseDto = (qnadocumentversion:QnaDocumentVersions): QnaDocumentVersionsDto => {
        if (qnadocumentversion == null) {
            return null;
        }
        const dto: QnaDocumentVersionsDto = {
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
