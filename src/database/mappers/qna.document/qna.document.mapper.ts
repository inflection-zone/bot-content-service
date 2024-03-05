import { QnaDocument } from "../../../database/models/qna.document/qna.document.model";
import { QnaDocumentDto } from "../../../domain.types/qna.document/qna.document.domain.types";

export class QnaDocumentVersionMapper {

    static toResponseDto = (qnadocument:QnaDocument): QnaDocumentDto => {
        if (qnadocument == null) {
            return null;
        }
        const dto: QnaDocumentDto = {
            id                    : qnadocument.id,
            Name                  : qnadocument.Name,
            Description           : qnadocument.Description,
            Filename              : qnadocument.FileName,
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
