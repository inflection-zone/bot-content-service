import { BaseSearchFilters } from "../miscellaneous/base.search.types";
import { integer, uuid } from "../miscellaneous/system.types";

export interface  QnaDocumentsDto {
    id                      : uuid;
    Name                    : string;
    Description             : string;
    Filename                : string;
    Source                  : string;
    CreatedBy               : string;
    ParentDocument          : string;
    ParentDocumentVersion   : integer;
    ChunkingStrategy        : string;
    ChunkingLenght          : integer;
    ChunkOverlap            : integer;
    Splitter                : string;
    IsActive                : boolean;

}
export interface  QnaDocumentsCreateModel {
    Name                    : string;
    Description?            : string;
    Filename                : string;
    Source                  : string;
    CreatedBy               : string;
    ParentDocument          : string;
    ParentDocumentVersion   : integer;
    ChunkingStrategy        : string;
    ChunkingLenght          : integer;
    ChunkOverlap            : integer;
    Splitter                : string;
    IsActive                : boolean;
}
    
export interface  QnaDocumentsUpdateModel {
    Name?                   : string;
    Description?            : string;
    Filename?               : string;
    Source?                 : string;
    CreatedBy?              : string;
    ParentDocument?         : string;
    ParentDocumentVersion?  : integer;
    ChunkingStrategy?       : string;
    ChunkingLenght?         : integer;
    ChunkOverlap?           : integer;
    Splitter?               : string;
    IsActive?               : boolean;
}
export interface QnaDocumentsSearchFilters extends BaseSearchFilters {
    id?                      : uuid;
    Name?                    : string;
    Filename?                : string;
    Source?                  : string;
    CreatedBy?               : string;
    ParentDocument?          : string;
    ParentDocumentVersion?   : integer;
    ChunkingStrategy?        : string;
    IsActive?                : boolean;
}
