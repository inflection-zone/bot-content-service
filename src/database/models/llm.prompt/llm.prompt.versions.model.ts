import { decimal } from "../../../domain.types/miscellaneous/system.types";
import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { LlmPrompts } from "./llm.prompts.model";

@Entity('llm_prompt_versions')
export class LlmPromptVersions extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
id: string;
  
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

@ManyToOne(
    ()=>LlmPrompts,
    llm_prompts=> llm_prompts.llm_prompt_versions
)
@JoinColumn({
    name : 'PromptId'
})
llm_prompts: LlmPrompts;

}
