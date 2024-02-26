/* eslint-disable eol-last */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('qna_document_library')
export class QnaDocumentLibrary extends BaseEntity{
  
@PrimaryGeneratedColumn('uuid')
id: string;

@Column(({ nullable: false }))
DocumentId: string;

}