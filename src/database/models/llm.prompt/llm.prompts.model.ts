import { decimal } from "../../../domain.types/miscellaneous/system.types";
import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
// import { LlmPromptGroup } from "./llm.prompt.groups.model";
import { LlmPromptVersion } from "./llm.prompt.versions.model";
import { PromptUsecase } from "../../../domain.types/usecase.domain.types";
import { PromptGroup } from "../../../domain.types/promptgroup.domain.types";
import { LlmPromptGroup } from "./llm.prompt.groups.model";

@Entity('llm_prompts')
export class LlmPrompt extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
id: string;
  
@Column(({ type: 'varchar', length: 256, nullable: false }))
Name: string;

@Column({ type: 'varchar', length: 256, nullable: true })
Description: string;

@Column({ type: "enum", enum: PromptUsecase })
UseCaseType: string;

@Column(({ type: "enum", enum: PromptGroup }))
GroupName: string;

@Column(({ type: 'varchar', length: 256, nullable: false }))
ModelName: string;

@Column(({ nullable: false }))
ModelVersion: string;

@Column(({ nullable: false }))
UserId: string;

@Column(({ nullable: false }))
Temperature: decimal;

@Column()
FrequencyPenality: decimal;

@Column()
TopP: decimal;

@Column()
PresencePenalty: decimal;

@Column()
IsActive: boolean;

@CreateDateColumn()
CreatedAt: Date;

@UpdateDateColumn()
UpdatedAt: Date;

@DeleteDateColumn()
DeletedAt: Date;

@ManyToMany(() => LlmPromptGroup, (llmromptGroups) => llmromptGroups.LlmPrompts)
    @JoinTable()
    LlmPromptGroups: LlmPromptGroup[];

// @ManyToMany(() => LlmPromptGroup)
// @JoinTable()
// llm_group_prompts: LlmPromptGroup[];

    @OneToMany(() => LlmPromptVersion,
        llm_prompt_versions => llm_prompt_versions.llm_prompts)
        llm_prompt_versions: LlmPromptVersion[];
    Roles: any;

}
