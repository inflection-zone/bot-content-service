import request from 'supertest';
import { expect } from 'chai';
import Application from '../../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from '../init';
import { faker } from '@faker-js/faker';
import { getRandomEnumValue } from '../utils';
import { ChunkingStrategy } from '../../src/domain.types/chunking.strategy.domain.types';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Qna Document tests', function () {
    var agent = request.agent(infra._app);

    it(' Create qna document record', function (done) {
        loadQnaDocumentCreateModel();
        const createModel = getTestData('QnaDocumentCreateModel');
        agent
            .post(`/api/v1/documents`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .send(createModel)
            .expect((response) => {
                setTestData(response.body.Data.id, 'QnaDocumentId_1');
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('FileName');
                expect(response.body.Data).to.have.property('Source');
                expect(response.body.Data).to.have.property('ParentDocument');
                expect(response.body.Data).to.have.property('ParentDocumentVersion');
                expect(response.body.Data).to.have.property('ChunkingStrategy');
                expect(response.body.Data).to.have.property('ChunkingLenght');
                expect(response.body.Data).to.have.property('ChunkOverlap');
                expect(response.body.Data).to.have.property('Splitter');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('CreatedBy');

                setTestData(response.body.Data.id, 'QnaDocumentId_1');

                expect(response.body.Data.Name).to.equal(getTestData('QnaDocumentCreateModel').Name);
                expect(response.body.Data.Description).to.equal(getTestData('QnaDocumentCreateModel').Description);
                expect(response.body.Data.FileName).to.equal(getTestData('QnaDocumentCreateModel').FileName);
                expect(response.body.Data.Source).to.equal(getTestData('QnaDocumentCreateModel').Source);
                expect(response.body.Data.ParentDocument).to.equal(
                    getTestData('QnaDocumentCreateModel').ParentDocument
                );
                expect(response.body.Data.ParentDocumentVersion).to.equal(
                    getTestData('QnaDocumentCreateModel').ParentDocumentVersion
                );
                expect(response.body.Data.ChunkingStrategy).to.equal(
                    getTestData('QnaDocumentCreateModel').ChunkingStrategy
                );
                expect(response.body.Data.ChunkingLenght).to.equal(
                    getTestData('QnaDocumentCreateModel').ChunkingLenght
                );
                expect(response.body.Data.ChunkOverlap).to.equal(getTestData('QnaDocumentCreateModel').ChunkOverlap);
                expect(response.body.Data.Splitter).to.equal(getTestData('QnaDocumentCreateModel').Splitter);
                expect(response.body.Data.IsActive).to.equal(getTestData('QnaDocumentCreateModel').IsActive);
                expect(response.body.Data.CreatedBy).to.equal(getTestData('QnaDocumentCreateModel').CreatedBy);
            })
            .expect(201, done);
    });

    it('Get qna document by id', function (done) {
        agent
            .get(`/api/v1/documents/${getTestData('QnaDocumentId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('FileName');
                expect(response.body.Data).to.have.property('Source');
                expect(response.body.Data).to.have.property('ParentDocument');
                expect(response.body.Data).to.have.property('ParentDocumentVersion');
                expect(response.body.Data).to.have.property('ChunkingStrategy');
                expect(response.body.Data).to.have.property('ChunkingLenght');
                expect(response.body.Data).to.have.property('ChunkOverlap');
                expect(response.body.Data).to.have.property('Splitter');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('CreatedBy');

                expect(response.body.Data.Name).to.equal(getTestData('QnaDocumentCreateModel').Name);
                expect(response.body.Data.Description).to.equal(getTestData('QnaDocumentCreateModel').Description);
                expect(response.body.Data.FileName).to.equal(getTestData('QnaDocumentCreateModel').FileName);
                expect(response.body.Data.Source).to.equal(getTestData('QnaDocumentCreateModel').Source);
                expect(response.body.Data.ParentDocument).to.equal(
                    getTestData('QnaDocumentCreateModel').ParentDocument
                );
                expect(response.body.Data.ParentDocumentVersion).to.equal(
                    getTestData('QnaDocumentCreateModel').ParentDocumentVersion
                );
                expect(response.body.Data.ChunkingStrategy).to.equal(
                    getTestData('QnaDocumentCreateModel').ChunkingStrategy
                );
                expect(response.body.Data.ChunkingLenght).to.equal(
                    getTestData('QnaDocumentCreateModel').ChunkingLenght
                );
                expect(response.body.Data.ChunkOverlap).to.equal(getTestData('QnaDocumentCreateModel').ChunkOverlap);
                expect(response.body.Data.Splitter).to.equal(getTestData('QnaDocumentCreateModel').Splitter);
                expect(response.body.Data.IsActive).to.equal(getTestData('QnaDocumentCreateModel').IsActive);
                expect(response.body.Data.CreatedBy).to.equal(getTestData('QnaDocumentCreateModel').CreatedBy);
            })

            .expect(200, done);
    });

    it('Update qna document ', function (done) {
        loadQnaDocumentUpdateModel();
        const updateModel = getTestData('QnaDocumentUpdateModel');
        agent
            .put(`/api/v1/documents/${getTestData('QnaDocumentId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .send(updateModel)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');
                expect(response.body.Data).to.have.property('FileName');
                expect(response.body.Data).to.have.property('Source');
                expect(response.body.Data).to.have.property('ParentDocument');
                expect(response.body.Data).to.have.property('ParentDocumentVersion');
                expect(response.body.Data).to.have.property('ChunkingStrategy');
                expect(response.body.Data).to.have.property('ChunkingLenght');
                expect(response.body.Data).to.have.property('ChunkOverlap');
                expect(response.body.Data).to.have.property('Splitter');
                expect(response.body.Data).to.have.property('IsActive');
                expect(response.body.Data).to.have.property('CreatedBy');

                expect(response.body.Data.Name).to.equal(getTestData('QnaDocumentUpdateModel').Name);
                expect(response.body.Data.Description).to.equal(getTestData('QnaDocumentUpdateModel').Description);
                expect(response.body.Data.FileName).to.equal(getTestData('QnaDocumentUpdateModel').FileName);
                expect(response.body.Data.Source).to.equal(getTestData('QnaDocumentUpdateModel').Source);
                expect(response.body.Data.ParentDocument).to.equal(
                    getTestData('QnaDocumentUpdateModel').ParentDocument
                );
                expect(response.body.Data.ParentDocumentVersion).to.equal(
                    getTestData('QnaDocumentUpdateModel').ParentDocumentVersion
                );
                expect(response.body.Data.ChunkingStrategy).to.equal(
                    getTestData('QnaDocumentUpdateModel').ChunkingStrategy
                );
                expect(response.body.Data.ChunkingLenght).to.equal(
                    getTestData('QnaDocumentUpdateModel').ChunkingLenght
                );
                expect(response.body.Data.ChunkOverlap).to.equal(getTestData('QnaDocumentUpdateModel').ChunkOverlap);
                expect(response.body.Data.Splitter).to.equal(getTestData('QnaDocumentUpdateModel').Splitter);
                expect(response.body.Data.IsActive).to.equal(getTestData('QnaDocumentUpdateModel').IsActive);
                expect(response.body.Data.CreatedBy).to.equal(getTestData('QnaDocumentUpdateModel').CreatedBy);
            })
            .expect(200, done);
    });

    it('Delete qna document', function (done) {
        agent
            .delete(`/api/v1/documents/${getTestData('QnaDocumentId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it(' qna document getAll', function (done) {
        agent
            .get(`/api/v1/documents/all/`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })

            .expect(200, done);
    });

    // it('Search qna document by name', function (done) {
    //     loadQnaDocumentQueryString();
    //     agent
    //         .get(`/api/v1/documents/search/${loadQnaDocumentQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //         // .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
    //         .expect((response) => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })

    //         .expect(200, done);
    // });

    // it('Search qna document by source', function (done) {
    //     loadQnaDocumentQueryString();
    //     agent
    //         .get(`/api/v1/documents/search/${loadQnaDocumentQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //         // .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
    //         .expect((response) => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })

    //         .expect(200, done);
    // });

    // it('Search qna document by strategy', function (done) {
    //     loadQnaDocumentQueryString();
    //     agent
    //         .get(`/api/v1/documents/search/${loadQnaDocumentQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //         // .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
    //         .expect((response) => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })

    //         .expect(200, done);
    // });

    // it('Search qna document by status', function (done) {
    //     loadQnaDocumentQueryString();
    //     agent
    //         .get(`/api/v1/documents/search/${loadQnaDocumentQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //         // .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
    //         .expect((response) => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })

    //         .expect(200, done);
    // });

    // it('Search qna document by parent document name', function (done) {
    //     loadQnaDocumentQueryString();
    //     agent
    //         .get(`/api/v1/documents/search/${loadQnaDocumentQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //         // .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
    //         .expect((response) => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })

    //         .expect(200, done);
    // });

    // it('Search qna document by parent document version', function (done) {
    //     loadQnaDocumentQueryString();
    //     agent
    //         .get(`/api/v1/documents/search/${loadQnaDocumentQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //         // .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
    //         .expect((response) => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })

    //         .expect(200, done);
    // });

    // it(' qna document Search by created by ', function (done) {
    //     loadQnaDocumentQueryString();
    //     agent
    //         .get(`/api/v1/documents/search/${loadQnaDocumentQueryString()}`)
    //         .set('Content-Type', 'application/json')
    //         // .set('x-api-key', `${process.env.TEST_API_KEY}`)
    //         // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
    //         .expect((response) => {
    //             expect(response.body).to.have.property('Status');
    //             expect(response.body.Status).to.equal('success');
    //         })

    //         .expect(200, done);
    // });

    it('06:03 -> Search qna document records', function (done) {
        loadOrganizationQueryString();
        agent
            .get(`/api/v1/documents/search${loadOrganizationQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect((response) => {
                expect(response.body.Data).to.have.property('TotalCount');
                expect(response.body.Data).to.have.property('RetrievedCount');
                expect(response.body.Data).to.have.property('PageIndex');
                expect(response.body.Data).to.have.property('ItemsPerPage');
                expect(response.body.Data).to.have.property('Order');
                expect(response.body.Data.TotalCount).to.be.at.least(0);
                expect(response.body.Data.RetrievedCount).to.be.at.least(0);
                expect(response.body.Data.Items.length).to.be.at.least(0);
            })
            .expect(200, done);
    });
});

export const loadQnaDocumentCreateModel = async () => {
    const model = {
        Name: faker.person.fullName(),
        Description: faker.lorem.words(10),
        FileName: faker.system.fileName(),
        Source: faker.lorem.words(1),
        ParentDocument: faker.lorem.words(1),
        ParentDocumentVersion: faker.number.int({ min: 10, max: 100 }),
        ChunkingStrategy: getRandomEnumValue(ChunkingStrategy),
        ChunkingLenght: faker.number.int({ min: 10, max: 100 }),
        ChunkOverlap: faker.number.int({ min: 10, max: 100 }),
        Splitter: faker.lorem.words(1),
        IsActive: faker.datatype.boolean(),
        CreatedBy: faker.lorem.words(1),
    };

    setTestData(model, 'QnaDocumentCreateModel');
};

export const loadQnaDocumentUpdateModel = async () => {
    const model = {
        Name: faker.person.fullName(),
        Description: faker.lorem.words(10),
        FileName: faker.system.fileName(),
        Source: faker.lorem.words(1),
        ParentDocument: faker.lorem.words(1),
        ParentDocumentVersion: faker.number.int({ min: 10, max: 100 }),
        ChunkingStrategy: getRandomEnumValue(ChunkingStrategy),
        ChunkingLenght: faker.number.int({ min: 10, max: 100 }),
        ChunkOverlap: faker.number.int({ min: 10, max: 100 }),
        Splitter: faker.lorem.words(1),
        IsActive: faker.datatype.boolean(),
        CreatedBy: faker.lorem.words(1),
    };
    setTestData(model, 'QnaDocumentUpdateModel');
};

function loadOrganizationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}
