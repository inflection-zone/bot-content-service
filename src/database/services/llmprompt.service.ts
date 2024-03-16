/* eslint-disable key-spacing */

// import express from 'express';
import { BaseService } from './base.service';
import { LlmPrompt } from '../models/llm.prompt/llm.prompts.model';
import { LlmPromptMapper } from '../mappers/llm.prompt/llm.prompt.mapper';
import { logger } from '../../logger/logger';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { LlmPromptCreateModel, LlmPromptDto, LlmPromptSearchFilters, LlmPromptSearchResults, LlmPromptUpdateModel } from '../../domain.types/llm.prompt/llm.prompt.domain.types';
import { Source } from '../database.connector';
import { Repository } from 'typeorm/repository/Repository';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { FindManyOptions, Like } from 'typeorm';
import { LlmPromptGroup } from '../models/llm.prompt/llm.prompt.groups.model';

export class LlmpromptService extends BaseService {

    _llmPromptRepository: Repository<LlmPrompt> = Source.getRepository(LlmPrompt);

    _llmPromptGroupRepository: Repository<LlmPromptGroup> = Source.getRepository(LlmPromptGroup);

    _selectAll = {
        id        : true,
        Name      : true,
        UseCaseType       :true,
        GroupName         : true,
        ModelName         : true,
        ModelVersion      : true,
        UserId            : true,
        emperature       : true,
        FrequencyPenality :true ,
        TopP              :true ,
        PresencePenalty   :true ,
        IsActive          :true ,
        CreatedAt : true,
        UpdatedAt : true,
        
        LlmPromptGroups : {
            id   : true,
            Name : true,
        }
    };

    create = async (createModel: LlmPromptCreateModel): Promise<LlmPromptDto> => {
        try {
            const llmprompt = new LlmPrompt();
            var group : LlmPromptGroup = null;
            if (createModel.LlmPromptGroupId) {
                group = await this._llmPromptGroupRepository.findOne({
                    where : {
                        id : createModel.LlmPromptGroupId
                    }
                });
                delete createModel.LlmPromptGroupId;
            }
            Object.assign(llmprompt, createModel);
            llmprompt.LlmPromptGroups = [group];
            var record = await this._llmPromptRepository.save(llmprompt);
            return LlmPromptMapper.toResponseDto(record);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create llmprompt!', error);
        }
    };
    // create = async (request: express.Request, response: express.Response) => {
    // public create = async (createModel: LlmPromptCreateModel)
    //     : Promise<LlmPromptDto> => {
    //     try {
    //         const data = this._llmPromptRepository.create({
    //             Name              : createModel.Name,
    //             Description       : createModel.Description,
    //             UseCaseType       : createModel.UseCaseType,
    //             GroupName         : createModel.GroupName,
    //             ModelName         : createModel.ModelName,
    //             ModelVersion      : createModel.ModelVersion,
    //             UserId            : createModel.UserId,
    //             Temperature       : createModel.Temperature,
    //             FrequencyPenality : createModel.FrequencyPenality,
    //             TopP              : createModel.TopP,
    //             PresencePenalty   : createModel.PresencePenalty,
    //             IsActive          : createModel.IsActive,
    //         });
    //         var record = await this._llmPromptRepository.save(data);
    //         return LlmPromptMapper.toResponseDto(record);
    //     }
    //     catch (error) {
    //         logger.error(error.message);
    //         ErrorHandler.throwInternalServerError(error.message, 500);
    //     }
    // };
    
    public update = async (id: uuid, model: LlmPromptUpdateModel)
    : Promise<LlmPromptDto> => {
        try {
            const updateData = await this._llmPromptRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('LLm prompt not found!');
            }
            if (model.Name != null) {
                updateData.Name = model.Name;
            }
            if ( model.Description != null) {
                updateData.Description = model.Description;
            }
            if ( model.UseCaseType != null) {
                updateData.UseCaseType = model.UseCaseType;
            }
            if ( model.GroupName != null) {
                updateData.GroupName = model.GroupName;
            }
            if ( model.ModelName != null) {
                updateData.ModelName = model.ModelName;
            }
            if ( model.ModelVersion != null) {
                updateData.ModelVersion = model.ModelVersion;
            }
            if (  model.UserId != null) {
                updateData.UserId = model.UserId;
            }
            if ( model.Temperature != null) {
                updateData.Temperature = model.Temperature;
            }
            if ( model.FrequencyPenality != null) {
                updateData.FrequencyPenality = model.FrequencyPenality;
            }
            if ( model.TopP != null) {
                updateData.TopP = model.TopP;
            }
            if ( model.PresencePenalty != null) {
                updateData.PresencePenalty  = model.PresencePenalty;
            }
            if ( model.IsActive != null) {
                updateData.IsActive = model.IsActive;
            }
         
            var record = await this._llmPromptRepository.save(updateData);
            return LlmPromptMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<LlmPromptDto> => {
        try {
            var llmPromptId = await this._llmPromptRepository.findOne({
                where : {
                    id : id
                },
            });
            return LlmPromptMapper.toResponseDto(llmPromptId);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getAll = async (): Promise<LlmPromptDto[]> =>{
        try {
            const data = [];
            var prompts = await this._llmPromptRepository.find();
            for (var i of prompts) {
                const record = LlmPromptMapper.toResponseDto(i);
                // const record = i;
                data.push(record);
            }
            return data;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to get Llm prompt record!', error);
        }
    };

    public getByStatus = async (status: boolean) => {
        try {
            var prompt = await this._llmPromptRepository.find({
                where : {
                    IsActive : status,
                },
            });
            return LlmPromptMapper.toArrayDto(prompt);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public delete = async (id: uuid)=> {
        try {
            var record = await this._llmPromptRepository.findOne({
                where : {
                    id : id
                }
            });
            var result = await this._llmPromptRepository.remove(record);
            result != null;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public search = async (filters: LlmPromptSearchFilters)
    : Promise<LlmPromptSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._llmPromptRepository.findAndCount(search);

            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => LlmPromptMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: LlmPromptSearchFilters) => {

        var search : FindManyOptions<LlmPrompt> = {
            relations : {
            },
            where : {
            },
            select : {
                id                : true,
                Name              : true,
                Description       : true,
                UseCaseType       : true,
                GroupName         : true,
                ModelName         : true,
                ModelVersion      : true,
                UserId            : true,
                Temperature       : true,
                FrequencyPenality : true,
                TopP              : true,
                PresencePenalty   : true,
                IsActive          : true,
            }
        };

        if (filters.Name) {
            search.where['Name'] = Like(`%${filters.Name}%`);
        }
        if (filters.UseCaseType) {
            search.where['UseCaseType'] = filters.UseCaseType;
        }
        if (filters.GroupName) {
            search.where['GroupName'] = filters.GroupName;
        }
        if (filters.ModelName) {
            search.where['ModelName'] = filters.ModelName;
        }
        if (filters.ModelVersion) {
            search.where['ModelVersion'] = filters.ModelVersion;
        }
        if (filters.UserId) {
            search.where['UserId'] = filters.UserId;
        }
        if (filters.Temperature) {
            search.where['Temperature'] = filters.Temperature;
        }
        if (filters.FrequencyPenality) {
            search.where['FrequencyPenality'] = filters.FrequencyPenality;
        }
        if (filters.TopP) {
            search.where['TopP'] = filters.TopP;
        }
        if (filters.PresencePenalty ) {
            search.where['PresencePenalty'] = filters.PresencePenalty ;
        }
        if (filters.IsActive ) {
            search.where['IsActive'] = filters.IsActive ;
        }
        return search;
    };

}

