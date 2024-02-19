
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('qna_library')
export class QnaLibrary extends BaseEntity{
  
@PrimaryGeneratedColumn()
id: string;

@Column(({ nullable: false }))
DocumentId: string;

}
