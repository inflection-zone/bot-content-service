import { BaseService } from './base.service';
import { logger } from '../../logger/logger';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { Source } from '../database.connector';
import { Repository } from 'typeorm/repository/Repository';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LlmPromptGroup } from '../models/llm.prompt/llm.prompt.groups.model';
import { LlmPromptGroupCreateModel, LlmPromptGroupSearchFilters } from '../../domain.types/llm.prompt/llm.prompt.group.domain.types';
import { LlmPromptGroupDto } from '../../domain.types/llm.prompt/llm.prompt.group.domain.types';
import { LlmPromptGroupMapper } from '../mappers/llm.prompt/llm.prompt.groups.mapper';
import { LlmPromptGroupUpdateModel } from '../../domain.types/llm.prompt/llm.prompt.group.domain.types';
import { FindManyOptions, Like } from 'typeorm';
import { LlmPrompt } from '../models/llm.prompt/llm.prompts.model';

export class LlmpromptGroupService extends BaseService {

    _llmPromptGroupRepository: Repository<LlmPromptGroup> = Source.getRepository(LlmPromptGroup);

    _llmPromptRepository: Repository<LlmPrompt> = Source.getRepository(LlmPrompt);

    _selectAll = {
        id          : true,
        Name        : true,
        Description : true,
        CreatedAt   : true,
        UpdatedAt   : true,
        LlmPrompts  : {
            id   : true,
            Name : true,
        }
    };

    create = async (createModel: LlmPromptGroupCreateModel): Promise<LlmPromptGroupDto> => {
        try {
            const llmpromptgroup = new LlmPromptGroup();
            var llmprompt : LlmPrompt = null;
            if (createModel.PromptId) {
                llmprompt = await this._llmPromptRepository.findOne({
                    where : {
                        id : createModel.PromptId
                    }
                });
                delete createModel.PromptId;
            }
            Object.assign(llmpromptgroup, createModel);
            llmpromptgroup.LlmPrompts = [llmprompt];
            var record = await this._llmPromptGroupRepository.save(llmpromptgroup);
            return LlmPromptGroupMapper.toResponseDto(record);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create prompt group!', error);
        }
    };

    public update = async (id: uuid, model: LlmPromptGroupUpdateModel)
    : Promise<LlmPromptGroupDto> => {
        try {
            const updateData = await this._llmPromptGroupRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('LLm prompt group id not found!');
            }
            if (model.Name != null) {
                updateData.Name = model.Name;
            }
            if ( model.Description != null) {
                updateData.Description = model.Description;
            }
            var record = await this._llmPromptGroupRepository.save(updateData);
            return LlmPromptGroupMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<LlmPromptGroupDto> => {
        try {
            var llmPromptGroupId = await this._llmPromptGroupRepository.findOne({
                where : {
                    id : id
                },
            });
            return LlmPromptGroupMapper.toResponseDto(llmPromptGroupId);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getAll = async (): Promise<LlmPromptGroupDto[]> =>{
        try {
            const data = [];
            var prompts = await this._llmPromptGroupRepository.find();
            for (var i of prompts) {
                const record = LlmPromptGroupMapper.toResponseDto(i);
                // const record = i;
                data.push(record);
            }
            return data;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to get Llm prompt group record!', error);
        }
    };
    
    public delete = async (id: string): Promise<boolean> => {
        try {
            // const record = await this._llmPromptRepository.findOne();
            var record = await this._llmPromptGroupRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._llmPromptGroupRepository.save(record);
            return true; // Soft delete successful
        } catch (error) {
            logger.error(error.message);
            throw new Error('Unable to delete prompt group.');
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // public getByName = async (name:string)=> {
    //     try {
    //         const group = [];
    //         var data = await this._llmPromptGroupRepository.find({
    //             where : {
    //                 Name : name
    //             },
    //         });
    //         for (var i of data) {
    //             // const record = LlmPromptGroupMapper.toResponseDto(i);
    //             // const record = (i);
    //             // const record = i;
    //             group.push(i);
    //         }
    //         return group;
    //     } catch (error) {
    //         logger.error(error.message);
    //         ErrorHandler.throwInternalServerError(error.message, 500);
    //     }
    // };
    public search = async (filters: LlmPromptGroupSearchFilters)
    : Promise<LlmPromptGroupSearchFilters> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._llmPromptGroupRepository.findAndCount(search);

            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => LlmPromptGroupMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: LlmPromptGroupSearchFilters) => {

        var search : FindManyOptions<LlmPromptGroup> = {
            relations : {
            },
            where : {
            },
            select : {
                id          : true,
                Name        : true,
                Description : true,
            }
        };
        if (filters.Name) {
            search.where['Name'] = Like(`%${filters.Name}%`);
        }
        return search;
    };

}
