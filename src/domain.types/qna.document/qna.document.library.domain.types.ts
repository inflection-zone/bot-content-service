import { uuid } from "../miscellaneous/system.types";

export interface  QnaLibraryDto {
    id         : uuid;
    DocumentId : string;
}
export interface  QnaLibraryCreateModel {
    id         : uuid;
    DocumentId : string;
}
export interface  QnaLibraryUpdateModel {
    id         : uuid;
    DocumentId : string;
}
 
