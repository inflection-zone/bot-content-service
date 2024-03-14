/* eslint-disable linebreak-style */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import request from 'supertest';
import { expect } from 'chai';
import Application from '../../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from '../init';
import { faker } from '@faker-js/faker';
// import { getRandomEnumValue } from '../utils';
// import { ChunkingStrategy } from '../../src/domain.types/chunking.strategy.domain.types';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Qna Document Library tests', function () {
    var agent = request.agent(infra._app);

    it(' Create qna document library record', function (done) {
        loadQnaDocumentLibraryCreateModel();
        const createModel = getTestData('QnaDocumentLibraryCreateModel');
        agent
            .post(`/api/v1/documentlibrarys`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .send(createModel)
            .expect((response) => {
                setTestData(response.body.Data.id, 'QnaDocumentLibraryId_1');

                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('DocumentId');

                setTestData(response.body.Data.id, 'QnaDocumentLibraryId_1');

                expect(response.body.Data.DocumentId).to.equal(getTestData('QnaDocumentLibraryCreateModel').DocumentId);
            })
            .expect(201, done);
    });

    it('Get qna document library by id', function (done) {
        agent
            .get(`/api/v1/documentlibrarys/${getTestData('QnaDocumentLibraryId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('DocumentId');

                expect(response.body.Data.DocumentId).to.equal(getTestData('QnaDocumentLibraryCreateModel').DocumentId);
            })

            .expect(200, done);
    });

    it('Update qna document library ', function (done) {
        loadQnaDocumentLibraryUpdateModel();
        const updateModel = getTestData('QnaDocumentLibraryUpdateModel');
        agent
            .put(`/api/v1/documentlibrarys/${getTestData('QnaDocumentLibraryId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .send(updateModel)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('DocumentId');

                expect(response.body.Data.DocumentId).to.equal(getTestData('QnaDocumentLibraryUpdateModel').DocumentId);
            })
            .expect(200, done);
    });

    it('Delete qna document library', function (done) {
        agent
            .delete(`/api/v1/documentlibrarys/${getTestData('QnaDocumentLibraryId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it(' qna document library getAll', function (done) {
        agent
            .get(`/api/v1/documentlibrarys/all/`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })

            .expect(200, done);
    });
});

export const loadQnaDocumentLibraryCreateModel = async () => {
    const model = {
        DocumentId: faker.string.uuid(),
    };

    setTestData(model, 'QnaDocumentLibraryCreateModel');
};

export const loadQnaDocumentLibraryUpdateModel = async () => {
    const model = {
        DocumentId: faker.string.uuid(),
    };
    setTestData(model, 'QnaDocumentLibraryUpdateModel');
};
