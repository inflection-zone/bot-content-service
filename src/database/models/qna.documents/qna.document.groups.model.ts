/* eslint-disable eol-last */
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QnaDocuments } from "./qna.document.model";

@Entity({ name: 'qna_document_groups' })
export class QnaDocumentGroups extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    Name: string;

    @Column({ type: 'varchar', length: 1024, nullable: true })
    Description: string;

    @ManyToMany(() => QnaDocuments)
    @JoinTable()
         "qna_group_documents":QnaDocuments[];
    
@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;

}