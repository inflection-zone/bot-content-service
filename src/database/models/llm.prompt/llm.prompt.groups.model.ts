import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LlmPrompts } from "./llm.prompts.model";

@Entity({ name: 'llm_prompt_groups' })
export class LlmPromptGroups extends BaseEntity {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ type: 'varchar', length: 32, nullable: false })
Name: string;

@Column({ type: 'varchar', length: 1024, nullable: true })
Description: string;

@ManyToMany(() => LlmPrompts)
@JoinTable()
"llm_group_prompts":LlmPrompts[];

@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;
   
}
