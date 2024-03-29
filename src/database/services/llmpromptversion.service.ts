/* eslint-disable indent */
import { BaseService } from './base.service';
import { logger } from '../../logger/logger';
import { ErrorHandler } from '../../common/handlers/error.handler';
import { Source } from '../database.connector';
import { Repository } from 'typeorm/repository/Repository';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { LlmPromptVersion } from '../models/llm.prompt/llm.prompt.versions.model';
import { LlmPromptVersionCreateModel, LlmPromptVersionSearchFilters, LlmPromptVersionSearchResults } from '../../domain.types/llm.prompt/llm.prompt.version.domain.types';
import { LlmPromptVersionUpdateModel } from '../../domain.types/llm.prompt/llm.prompt.version.domain.types';
import { LlmPromptVersionDto } from '../../domain.types/llm.prompt/llm.prompt.version.domain.types';
import { LlmPromptVersionMapper } from '../mappers/llm.prompt/llm.prompt.version.mapper';
import { FindManyOptions, Like } from 'typeorm';
import { LlmPrompt } from '../models/llm.prompt/llm.prompts.model';

export class LlmpromptVersionService extends BaseService {

    _llmPromptVersionRepository: Repository<LlmPromptVersion> = Source.getRepository(LlmPromptVersion);

    _llmPromptRepository: Repository<LlmPrompt> = Source.getRepository(LlmPrompt);

    // create = async (request: express.Request, response: express.Response) => {
    public create = async (createModel: LlmPromptVersionCreateModel)
        : Promise<LlmPromptVersionDto> => {
        try {
            const pid = await this._llmPromptRepository.findOne({
                where : {
                    id : createModel.PromptId
                }
            });
            if (!pid) {
                ErrorHandler.throwNotFoundError('PromptId cannot be found');
            }
            const data = this. _llmPromptVersionRepository.create({
                VersionNumber : createModel.VersionNumber,
                llm_prompts   : pid,
                Prompt        : createModel.Prompt,
                Variables     : JSON.stringify(createModel.Variables),
                Score         : createModel.Score,
                PublishedAt   : createModel.PublishedAt,
            });
            var record = await this._llmPromptVersionRepository.save(data);
            return LlmPromptVersionMapper.toResponseDto(record);
        }
        catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };
    
    public update = async (id: uuid, model: LlmPromptVersionUpdateModel)
    : Promise<LlmPromptVersionDto> => {
        try {
            const updateData = await this._llmPromptVersionRepository.findOne({
                where : {
                    id : id
                }
            });
            if (!updateData) {
                ErrorHandler.throwNotFoundError('LLm prompt version not found!');
            }
            if (model.VersionNumber != null) {
                updateData.VersionNumber = model.VersionNumber;
            }
            if ( model.Prompt != null) {
                updateData.Prompt = model.Prompt;
            }
            if ( model.Variables != null) {
                updateData.Variables  = JSON.stringify(model.Variables);
            }
            if ( model.Score != null) {
                updateData.Score = model.Score;
            }
            if ( model.PublishedAt != null) {
                updateData.PublishedAt = model.PublishedAt;
            }
                  
            var record = await this._llmPromptVersionRepository.save(updateData);
            return LlmPromptVersionMapper.toResponseDto(record);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getById = async (id: uuid): Promise<LlmPromptVersionDto> => {
        try {
            var llmPromptVersionId = await this._llmPromptVersionRepository.findOne({
                where : {
                    id : id
                },
            });
            return LlmPromptVersionMapper.toResponseDto(llmPromptVersionId);
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwInternalServerError(error.message, 500);
        }
    };

    public getAll = async (): Promise<LlmPromptVersionDto[]> =>{
        try {
            const data = [];
            var prompts = await this._llmPromptVersionRepository.find();
            for (var i of prompts) {
                const record = LlmPromptVersionMapper.toResponseDto(i);
                // const record = i;
                data.push(record);
            }
            return data;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to get Llm prompt version record!', error);
        }
    };
    
    // public delete = async (id: uuid)=> {
    //     try {
    //         var record = await this._llmPromptVersionRepository.findOne({
    //             where : {
    //                 id : id
    //             }
    //         });
    //         var result = await this._llmPromptVersionRepository.remove(record);
    //         result != null;
    //     } catch (error) {
    //         logger.error(error.message);
    //         ErrorHandler.throwInternalServerError(error.message, 500);
    //     }
    // };

    public delete = async (id: string): Promise<boolean> => {
        try {
            // const record = await this._llmPromptRepository.findOne();
            var record = await this._llmPromptVersionRepository.findOne({
                            where : {
                                id : id
                            }
                        });
            if (!record) {
                return false; // Record not found
            }
            record.DeletedAt = new Date(); // Soft delete
            await this._llmPromptVersionRepository.save(record);
            return true; // Soft delete successful
        } catch (error) {
            logger.error(error.message);
            throw new Error('Unable to delete prompt version.');
        }
    };

    public search = async (filters: LlmPromptVersionSearchFilters)
    : Promise<LlmPromptVersionSearchResults> => {
        try {
            var search = this.getSearchModel(filters);
            var { search, pageIndex, limit, order, orderByColumn } = this.addSortingAndPagination(search, filters);
            const [list, count] = await this._llmPromptVersionRepository.findAndCount(search);

            const searchResults = {
                TotalCount     : count,
                RetrievedCount : list.length,
                PageIndex      : pageIndex,
                ItemsPerPage   : limit,
                Order          : order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy      : orderByColumn,
                Items          : list.map(x => LlmPromptVersionMapper.toResponseDto(x)),
            };
            return searchResults;
        } catch (error) {
            logger.error(error.message);
            ErrorHandler.throwDbAccessError('DB Error: Unable to search records!', error);
        }
    };

    private getSearchModel = (filters: LlmPromptVersionSearchFilters) => {

        var search : FindManyOptions<LlmPromptVersion> = {
            relations : {
            },
            where : {
            },
            select : {
                id            : true,
                VersionNumber : true,
                // PromptId      : true,
                Prompt        : true,
                Variables     : true,
                Score         : true,
                PublishedAt   : true,
            }
        };

        if (filters.VersionNumber) {
            search.where['VersionNumber'] = Like(`%${filters.VersionNumber}%`);
        }
        // if (filters.PromptId) {
        //     search.where['PromptId'] = filters.PromptId;
        // }
        if (filters.Prompt) {
            search.where['Prompt'] = filters.Prompt;
        }
        if (filters.Variables) {
            search.where['Variables'] = filters.Variables;
        }
        if (filters.Score) {
            search.where['Score'] = filters.Score;
        }
        if (filters.PublishedAt) {
            search.where['PublishedAt'] = filters.PublishedAt;
        }
        return search;
    };

}
