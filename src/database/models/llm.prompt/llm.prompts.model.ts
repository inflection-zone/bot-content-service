import { decimal } from "../../../domain.types/miscellaneous/system.types";
import { Entity,BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { LlmPromptGroups } from "./llm.prompt.groups.model";
import { LlmPromptVersions } from "./llm.prompt.versions.model";
import { PromptUsecase } from "../../../domain.types/usecase.domain.types";

@Entity('llm_prompts')
export class LlmPrompts extends BaseEntity{

@PrimaryGeneratedColumn('uuid')
id: string;
  
@Column(({ type: 'varchar', length: 256, nullable: false }))
Name: string;

@Column({ type: 'varchar', length: 256, nullable: true })
Description: string;

@Column({ type: "enum",enum: PromptUsecase })
UseCaseType: string[];

@Column(({ type: 'varchar', length: 256, nullable: false }))
ModelName: string;

@Column(({ nullable: false}))
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

@ManyToMany(() => LlmPromptGroups)
@JoinTable()
llm_group_prompts: LlmPromptGroups[];
    // @JoinTable({
    //     name       : "llm_group_prompts",
    //     joinColumn : {
    //         name                 : "GroupId",
    //         referencedColumnName : "id"
    //     },
    //     inverseJoinColumn : {
    //         name                 : "PromptId",
    //         referencedColumnName : "id"
    //     }
    // })
    // llm_prompt_groups: LlmPromptGroups[];

    @OneToMany(() => LlmPromptVersions,
        llm_prompt_versions => llm_prompt_versions.llm_prompts)
        llm_prompt_versions: LlmPromptVersions[];
  }
