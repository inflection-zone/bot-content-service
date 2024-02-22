import { QnaDocument } from "../../../database/models/qna.documents/qna.documents.model";
import { QnaDocumentsDto } from "../../../domain.types/qna.document/qna.documents.domain.types";

export class QnaDocumentVersionsMapper {

    static toResponseDto = (qnadocument:QnaDocument): QnaDocumentsDto => {
        if (qnadocument == null) {
            return null;
        }
        const dto: QnaDocumentsDto = {
            id                    : qnadocument.id,
            Name                  : qnadocument.Name,
            Description           : qnadocument.Description,
            Filename              : qnadocument.Filename,
            Source                : qnadocument.Source,
            CreatedBy             : qnadocument.CreatedBy,
            ParentDocument        : qnadocument.ParentDocument,
            ParentDocumentVersion : qnadocument.ParentDocumentVersion,
            ChunkingStrategy      : qnadocument.ChunkingStrategy,
            ChunkingLenght        : qnadocument.ChunkingLenght,
            ChunkOverlap          : qnadocument.ChunkOverlap,
            Splitter              : qnadocument.Splitter,
            IsActive              : qnadocument.IsActive
        };
        return dto;
    };

}
