import { decimal, uuid } from "../../../domain.types/miscellaneous/system.types";
import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { LlmPrompt } from "./llm.prompts.model";

@Entity('llm_prompt_versions')
export class LlmPromptVersion extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
id: uuid;
  
@Column(({ unique: true, nullable: false }))
VersionNumber: string;

@Column({ type: 'varchar', length: 256, nullable: false })
Prompt: string;

@Column(({ nullable: false }))
Variables: string;

@Column(({ nullable: false }))
Score: decimal;

@Column({ type: 'date', nullable: true })
PublishedAt: Date;

@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;

@ManyToOne(() => LlmPrompt, { eager: true, nullable: true })
@JoinColumn()
LlmPrompts: LlmPrompt;

}
