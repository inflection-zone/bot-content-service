import { integer, uuid } from '../miscellaneous/system.types';

//////////////////////////////////////////////////////////////

export interface QnaDocumentGroupCreateModel {
    
    DocumentId: uuid;
}

export interface QnaDocumentGroupUpdateModel {
   
    DocumentId?: uuid;
}

export interface QnaDocumentGroupResponseDto {
    id: uuid;
    DocumentId: uuid;
}
