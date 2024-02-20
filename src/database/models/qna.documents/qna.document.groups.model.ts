import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QnaDocuments } from "./qna.documents.model";

@Entity({ name: 'qna_document_groups' })
export class QnaDocumentGroups extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 32, nullable: false})
    Name: string;

    @Column({ type: 'varchar', length: 1024, nullable: true })
    Description: string;

    @ManyToMany(() => QnaDocuments)
    @JoinTable()
         "llm_group_prompts":QnaDocuments[];
    // @ManyToMany(() => QnaDocuments)
    // @JoinTable({
    //     name       : "qna_group_documents",
    //     joinColumn : {
    //         name                 : "GroupId",
    //         referencedColumnName : "id"
    //     },
    //     inverseJoinColumn : {
    //         name                 : "DocumentId",
    //         referencedColumnName : "id"
    //     }
    // })
    // qna_documents: QnaDocuments[];

@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;
    static id: string;
    static Name: string;
    static Description: string;

}
