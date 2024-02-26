/* eslint-disable no-multiple-empty-lines */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padded-blocks */
import { uuid } from '../../../domain.types/miscellaneous/system.types';
import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { QnaDocument } from './qna.document.model';

@Entity('qna_document_versions')
export class QnaDocumentVersion extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    VersionNumber: number;

    @Column({ type: 'varchar', length: 1024, nullable: true })
    StorageUrl: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    DownloadUrl: string;

    @Column({ type: 'varchar', length: 256, nullable: false })
    FileResourceId: string;

    @Column({ nullable: false })
    Keywords: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;

    @ManyToOne(() => QnaDocument, (qna_documents) => qna_documents.qna_document_versions)
    @JoinColumn({
        name : 'DocumentId',
    })
    qna_documents: QnaDocument;
}
