/* eslint-disable eol-last */
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QnaDocument } from "./qna.document.model";

@Entity({ name: 'qna_document_groups' })
export class QnaDocumentGroup extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    Name: string;

    @Column({ type: 'varchar', length: 1024, nullable: true })
    Description: string;

    @ManyToMany(() => QnaDocument)
    @JoinTable()
         "qna_group_documents":QnaDocument[];
    
@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;

}