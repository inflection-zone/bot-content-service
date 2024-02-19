import { integer } from "../../../domain.types/miscellaneous/system.types";
// import { uuid } from "../../../domain.types/miscellaneous/system.types";
import {Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable} from "typeorm";
import { QnaDocuments } from "./qna.documents.model";

@Entity('qna_document_versions')
export class QnaDocumentVersions extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
id: string;
  
@Column(({ unique: true, nullable: false }))
VersionNumber: string;

@Column({ type: 'varchar', length: 256, nullable: false })
StorageUrl: string;

@Column({ type: 'varchar', length: 256, nullable: false })
DownloadUrl: string;

@Column({ type: 'varchar', length: 256, nullable: false })
FileResourceId: string;

@Column(({ nullable: false }))
Keywords: string[];

@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;

@ManyToOne(
    ()=>QnaDocuments,
    qna_documents=> qna_documents.qna_document_versions
)
@JoinColumn({
    name : 'DocumentId'
})
qna_documents : QnaDocuments;

}
