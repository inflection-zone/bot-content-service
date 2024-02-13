import { integer } from "../../../domain.types/miscellaneous/system.types";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('qna_library')
export class QnaLibrary extends BaseEntity{
  
@PrimaryGeneratedColumn()
id: number;

@Column(({ nullable: false }))
DocumentId: integer;

}