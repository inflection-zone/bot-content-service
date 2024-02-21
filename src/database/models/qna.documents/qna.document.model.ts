/* eslint-disable eol-last */
import { integer } from "../../../domain.types/miscellaneous/system.types";
// import { uuid } from "../../../domain.types/miscellaneous/system.types";
import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { QnaDocumentGroups } from "./qna.document.groups.model";
import { QnaDocumentVersions } from "./qna.document.versions.model";
import { ChunkingStrategy } from "../../../domain.types/chunking.strategy.domain.types";

@Entity('qna_documents')
export class QnaDocument extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
id: string;
  
@Column(({ type: 'varchar', length: 256, nullable: false }))
Name: string;

@Column({ type: 'varchar', length: 256, nullable: false })
Description: string;

@Column(({ type: 'varchar', length: 256, nullable: false }))
Filename: string;

@Column(({ type: 'varchar', length: 256, nullable: false }))
Source: string;

@Column(({ type: 'varchar', length: 256, nullable: false }))
CreatedBy: string;

@Column(({ type: 'varchar', length: 256, nullable: true }))
ParentDocument: string;

@Column(({ type: 'varchar', length: 256, nullable: true }))
ParentDocumentVersion: integer;

@Column({ type: "enum",enum: ChunkingStrategy })
ChunkingStrategy: string;

@Column()
ChunkingLenght: integer;

@Column()
ChunkOverlap: integer;

@Column()
Splitter: string;

@Column()
IsActive: boolean;

@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;

@ManyToMany(() => QnaDocumentGroups)
@JoinTable()
qna_group_documents:QnaDocumentGroups[];

@OneToMany(() => QnaDocumentVersions,
    qna_document_versions => qna_document_versions.qna_documents)
    qna_document_versions: QnaDocumentVersions[];

}