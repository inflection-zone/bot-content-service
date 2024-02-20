import { uuid } from "../miscellaneous/system.types";

export interface  QnaDocumentGroupsDto {
    id         : uuid;
    Name       : string;
    Description: string;
}
export interface  QnaDocumentGroupsCreateModel {
    Name        : string;
    Description?: string;
}
export interface  QnaDocumentGroupsUpdateModel {
    Name?       : string;
    Description?: string;
}