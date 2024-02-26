import { BaseSearchFilters } from "../miscellaneous/base.search.types";
import { uuid } from "../miscellaneous/system.types";

export interface  QnaDocumentGroupDto {
    id         : uuid;
    Name       : string;
    Description: string;
}
export interface  QnaDocumentGroupCreateModel {
    Name        : string;
    Description?: string;
}
export interface  QnaDocumentGroupUpdateModel {
    Name?       : string;
    Description?: string;
}
export interface QnaDocumentGroupSearchFilters extends BaseSearchFilters {
    id?         : uuid;
    Name?       : string;
}
