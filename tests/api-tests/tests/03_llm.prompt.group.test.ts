/* eslint-disable indent */
import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';
import { getRandomEnumValue } from '../utils';
import { PromptGroup } from '../../../src/domain.types/promptgroup.domain.types';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('03 - PromptGroup tests', function () {
    var agent = request.agent(infra._app);

    it('03:01 -> Create PromptGroup', function (done) {
        loadLlmPromptGroupCreateModel();
        const createModel = getTestData('LlmPromptGroupCreateModel');
        agent
            .post(`/api/v1/llmpromptgroups`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect((response) => {
                setTestData(response.body.Data.id, 'LlmPromptGroupId_1');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');

                setTestData(response.body.Data.id, 'LlmPromptGroupId_1');
                expect(response.body.Data.Name).to.equal(getTestData('LlmPromptGroupCreateModel').Name);
                expect(response.body.Data.Description).to.equal(getTestData('LlmPromptGroupCreateModel').Description);
                
            })
            .expect(201, done);
    });

    it('03:02 -> GetByID PromptGroup', function (done) {
     agent
         .get(`/api/v1/llmpromptgroups`)
         .set('Content-Type', 'application/json')
         .expect((response) => {
             expect(response.body.Data).to.have.property('id');
             expect(response.body.Data).to.have.property('Name');
             expect(response.body.Data).to.have.property('Description');
   
             expect(response.body.Data.Name).to.equal(getTestData('LlmPromptGroupCreateModel').Name);
             expect(response.body.Data.Description).to.equal(getTestData('LlmPromptGroupCreateModel').Description);
             
         })
         .expect(201, done);
   });
   

    it('03:03 -> Update PromptGroup', function (done) {
     loadLlmPromptGroupUpdateModel();
        const UpdateModel = getTestData('LlmPromptGroupUpdateModel');
        agent
            .put(`/api/v1/llmpromptgroups`)
            .set('Content-Type', 'application/json')
            .send(UpdateModel)
            .expect((response) => {
             setTestData(response.body.Data.id, 'LlmPromptGroupId_1');
             expect(response.body.Data).to.have.property('id');
             expect(response.body.Data).to.have.property('Name');
             expect(response.body.Data).to.have.property('Description');

             setTestData(response.body.Data.id, 'LlmPromptGroupId_1');
             expect(response.body.Data.Name).to.equal(getTestData('LlmPromptGroupUpdateModel').Name);
             expect(response.body.Data.Description).to.equal(getTestData('LlmPromptGroupUpdateModel').Description);
             
         })
         .expect(201, done);
 });

 
 it('03:04 -> Delete LlmPromptGroup', function(done) {
        
  agent
      .delete(`/api/v1/llmpromptgroups${getTestData('LlmPromptGroupId_1')}`)
      .set('Content-Type', 'application/json')
      .expect(response => {
          expect(response.body).to.have.property('Status');
          expect(response.body.Status).to.equal('success');
      })
      .expect(200, done);
 });
});

export const loadLlmPromptGroupCreateModel = async () => {
    const model = {
        Name        : getRandomEnumValue(PromptGroup),
        Description : faker.lorem.words(200),
    };
    setTestData(model, 'LlmPromptGroupCreateModel');
};

export const loadLlmPromptGroupUpdateModel = async () => {
    const model = {
        Name        : getRandomEnumValue(PromptGroup),
        Description : faker.lorem.words(200),
    };
    setTestData(model, 'LlmPromptGroupUpdateModel');
};
