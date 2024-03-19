import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LlmPrompt } from "./llm.prompts.model";

@Entity({ name: 'llm_prompt_groups' })
export class LlmPromptGroup extends BaseEntity {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ type: 'varchar', length: 32, nullable: false })
Name: string;

@Column({ type: 'varchar', length: 1024, nullable: true })
Description: string;

@ManyToMany(() => LlmPrompt, (llmprompt) => llmprompt.LlmPromptGroups)
LlmPrompts: LlmPrompt[];

@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;
   
}
