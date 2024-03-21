/* eslint-disable indent */
import request from 'supertest';
import { expect } from 'chai';
import Application from '../../../src/app';
import { describe, it } from 'mocha';
import { faker } from '@faker-js/faker';
import { getTestData, setTestData } from '../init';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('02 - Prompt version tests', function () {
    var agent = request.agent(infra._app);

    it('02:01 -> Create Prompt Version', function (done) {
        loadLlmPromptVersionCreateModel();
        const createModel = getTestData('LlmPromptVersionCreateModel');
        agent
            .post(`/api/v1/llmpromptversions`)
            .set('Content-Type', 'application/json')
            .send(createModel)
            .expect((response) => {
                setTestData(response.body.Data.id, 'LlmPromptVersionId_1');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('VersionNumber');
                expect(response.body.Data).to.have.property('PromptId');
                expect(response.body.Data).to.have.property('Variables');
                expect(response.body.Data).to.have.property('Score');
                expect(response.body.Data).to.have.property('PublishedAt ');
               
                setTestData(response.body.Data.id, 'LlmPromptVersionId_1');

                expect(response.body.Data.VersionNumber).to.equal(getTestData('LlmPromptVersionCreateModel').VersionNumber);
                expect(response.body.Data.Description).to.equal(getTestData('LlmPromptVersionCreateModel').Description);
                expect(response.body.Data.PromptId).to.equal(getTestData('LlmPromptVersionCreateModel').PromptId);
                expect(response.body.Data.Variables).to.equal(getTestData('LlmPromptVersionCreateModel').Variables);
                expect(response.body.Data.Score).to.equal(getTestData('LlmPromptVersionCreateModel').Score);
                expect(response.body.Data.PublishedAt).to.equal(getTestData('LlmPromptVersionCreateModel').PublishedAt);
            })
            .expect(201, done);
    });

    it('02:02 -> GetById Prompt Version', function (done) {
     agent
         .get(`/api/v1/llmpromptversions`)
         .set('Content-Type', 'application/json')
   
         .expect((response) => {
             
             expect(response.body.Data).to.have.property('id');
             expect(response.body.Data).to.have.property('VersionNumber');
             expect(response.body.Data).to.have.property('PromptId');
             expect(response.body.Data).to.have.property('Variables');
             expect(response.body.Data).to.have.property('Score');
             expect(response.body.Data).to.have.property('PublishedAt ');
   
             expect(response.body.Data.VersionNumber).to.equal(getTestData('LlmPromptVersionCreateModel').VersionNumber);
             expect(response.body.Data.Description).to.equal(getTestData('LlmPromptVersionCreateModel').Description);
             expect(response.body.Data.PromptId).to.equal(getTestData('LlmPromptVersionCreateModel').PromptId);
             expect(response.body.Data.Variables).to.equal(getTestData('LlmPromptVersionCreateModel').Variables);
             expect(response.body.Data.Score).to.equal(getTestData('LlmPromptVersionCreateModel').Score);
             expect(response.body.Data.PublishedAt).to.equal(getTestData('LlmPromptVersionCreateModel').PublishedAt);
         })
         .expect(201, done);
   });

    it('02:03 -> Update Prompt Version', function (done) {
     loadLlmPromptVersionUpdateModel();
     const createModel = getTestData('LlmPromptVersionUpdateModel');
     agent
         .put(`/api/v1/llmpromptversions`)
         .set('Content-Type', 'application/json')
         .send(createModel)
         .expect((response) => {
             
             expect(response.body.Data).to.have.property('id');
             expect(response.body.Data).to.have.property('VersionNumber');
             expect(response.body.Data).to.have.property('PromptId');
             expect(response.body.Data).to.have.property('Variables');
             expect(response.body.Data).to.have.property('Score');
             expect(response.body.Data).to.have.property('PublishedAt ');

             expect(response.body.Data.VersionNumber).to.equal(getTestData('LlmPromptVersionUpdateModel').VersionNumber);
             expect(response.body.Data.Description).to.equal(getTestData('LlmPromptVersionUpdateModel').Description);
             expect(response.body.Data.PromptId).to.equal(getTestData('LlmPromptVersionUpdateModel').PromptId);
             expect(response.body.Data.Variables).to.equal(getTestData('LlmPromptVersionUpdateModel').Variables);
             expect(response.body.Data.Score).to.equal(getTestData('LlmPromptVersionUpdateModel').Score);
             expect(response.body.Data.PublishedAt).to.equal(getTestData('LlmPromptVersionUpdateModel').PublishedAt);
         })
         .expect(201, done);
 });

 

it('02:04 -> Delete LlmPrompt version', function(done) {
        
 agent
     .delete(`/api/v1/llmpromptversions${getTestData('LlmPromptVersionId_1')}`)
     .set('Content-Type', 'application/json')
     .expect(response => {
         expect(response.body).to.have.property('Status');
         expect(response.body.Status).to.equal('success');
     })
     .expect(200, done);
});

});

export const loadLlmPromptVersionCreateModel = async () => {
 const model = {
    
  VersionNumber : faker.lorem.words(2),
  PromptId      : faker.lorem.words(2),
  Variables     : faker.lorem.words(3),
  Score         : faker.number.float(),
  PublishedAt   : faker.date.past(),

 };
 setTestData(model, 'LlmPromptVersionCreateModel');
};

export const loadLlmPromptVersionUpdateModel = async () => {
 const model = {
    
     VersionNumber : faker.lorem.words(2),
     PromptId      : faker.lorem.words(2),
     Variables     : faker.lorem.words(3),
     Score         : faker.number.float(),
     PublishedAt   : faker.date.past(),

 };
 setTestData(model, 'LlmPromptVersionUpdateModel');
};
