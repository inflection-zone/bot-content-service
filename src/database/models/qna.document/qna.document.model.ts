/* eslint-disable no-multiple-empty-lines */
/* eslint-disable eol-last */
// import { integer } from "../../../domain.types/miscellaneous/system.types";
// import { uuid } from "../../../domain.types/miscellaneous/system.types";
import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { QnaDocumentGroup } from './qna.document.groups.model';
// import { QnaDocument } from "./qna.document.version.model";
import { ChunkingStrategy } from '../../../domain.types/chunking.strategy.domain.types';
import { QnaDocumentVersion } from './qna.document.version.model';

@Entity('qna_documents')
export class QnaDocument extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    Name: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    Description: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    FileName: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    Source: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    CreatedBy: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    ParentDocument: string;

    // @Column(({ type: 'varchar', length: 256, nullable: true }))
    @Column()
    ParentDocumentVersion: number;

    @Column({ type: 'enum', enum: ChunkingStrategy })
    ChunkingStrategy: string;

    @Column()
    ChunkingLenght: number;

    @Column()
    ChunkOverlap: number;

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

    @ManyToMany(() => QnaDocumentGroup)
    @JoinTable()
    qna_group_documents: QnaDocumentGroup[];

    @OneToMany(() => QnaDocumentVersion, (qna_document_versions) => qna_document_versions.qna_documents)
    qna_document_versions: QnaDocumentVersion[];
}
