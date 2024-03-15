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

describe('Qna Document Version tests', function () {
    var agent = request.agent(infra._app);

    it(' Create qna document version record', function (done) {
        loadQnaDocumentVersionCreateModel();
        const createModel = getTestData('QnaDocumentVersionCreateModel');
        agent
            .post(`/api/v1/documentversions`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .send(createModel)
            .expect((response) => {
                setTestData(response.body.Data.id, 'QnaDocumentVersionId_1');

                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('VersionNumber');
                expect(response.body.Data).to.have.property('StorageUrl');
                expect(response.body.Data).to.have.property('DownloadUrl');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('Keywords');

                setTestData(response.body.Data.id, 'QnaDocumentVersionId_1');

                expect(response.body.Data.VersionNumber).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').VersionNumber
                );
                expect(response.body.Data.StorageUrl).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').StorageUrl
                );
                expect(response.body.Data.DownloadUrl).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').DownloadUrl
                );
                expect(response.body.Data.FileResourceId).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').FileResourceId
                );
                expect(response.body.Data.Keywords).to.equal(getTestData('QnaDocumentVersionCreateModel').Keywords);
            })
            .expect(201, done);
    });

    it('Get qna document version by id', function (done) {
        agent
            .get(`/api/v1/documentversions/${getTestData('QnaDocumentVersionId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('VersionNumber');
                expect(response.body.Data).to.have.property('StorageUrl');
                expect(response.body.Data).to.have.property('DownloadUrl');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('Keywords');

                expect(response.body.Data.VersionNumber).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').VersionNumber
                );
                expect(response.body.Data.StorageUrl).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').StorageUrl
                );
                expect(response.body.Data.DownloadUrl).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').DownloadUrl
                );
                expect(response.body.Data.FileResourceId).to.equal(
                    getTestData('QnaDocumentVersionCreateModel').FileResourceId
                );
                expect(response.body.Data.Keywords).to.equal(getTestData('QnaDocumentVersionCreateModel').Keywords);
            })

            .expect(200, done);
    });

    it('Update qna document version ', function (done) {
        loadQnaDocumentVersionUpdateModel();
        const updateModel = getTestData('QnaDocumentVersionUpdateModel');
        agent
            .put(`/api/v1/documentversions/${getTestData('QnaDocumentVersionId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .send(updateModel)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('VersionNumber');
                expect(response.body.Data).to.have.property('StorageUrl');
                expect(response.body.Data).to.have.property('DownloadUrl');
                expect(response.body.Data).to.have.property('FileResourceId');
                expect(response.body.Data).to.have.property('Keywords');

                expect(response.body.Data.VersionNumber).to.equal(
                    getTestData('QnaDocumentVersionUpdateModel').VersionNumber
                );
                expect(response.body.Data.StorageUrl).to.equal(
                    getTestData('QnaDocumentVersionUpdateModel').StorageUrl
                );
                expect(response.body.Data.DownloadUrl).to.equal(
                    getTestData('QnaDocumentVersionUpdateModel').DownloadUrl
                );
                expect(response.body.Data.FileResourceId).to.equal(
                    getTestData('QnaDocumentVersionUpdateModel').FileResourceId
                );
                expect(response.body.Data.Keywords).to.equal(getTestData('QnaDocumentVersionUpdateModel').Keywords);
            })
            .expect(200, done);
    });

    it('Delete qna document version', function (done) {
        agent
            .delete(`/api/v1/documentversions/${getTestData('QnaDocumentVersionId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it(' qna document version getAll', function (done) {
        agent
            .get(`/api/v1/documentversions/all/`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })

            .expect(200, done);
    });

    it('06:03 -> Search qna document version records', function(done) {
        loadOrganizationQueryString();
        agent
            .get(`/api/v1/documents/search${loadOrganizationQueryString()}`)
            .set('Content-Type', 'application/json')
            .expect(response => {
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

export const loadQnaDocumentVersionCreateModel = async () => {
    const model = {
        VersionNumber: faker.number.int({ min: 10, max: 100 }),
        StorageUrl: faker.internet.url(),
        DownloadUrl: faker.internet.url(),
        FileResourceId: faker.string.uuid(),
        Keywords: faker.lorem.words(10),
    };

    setTestData(model, 'QnaDocumentVersionCreateModel');
};

export const loadQnaDocumentVersionUpdateModel = async () => {
    const model = {
        VersionNumber: faker.number.int({ min: 10, max: 100 }),
        StorageUrl: faker.internet.url(),
        DownloadUrl: faker.internet.url(),
        FileResourceId: faker.string.uuid(),
        Keywords: faker.lorem.words(10),
    };
    setTestData(model, 'QnaDocumentVersionUpdateModel');
};

function loadOrganizationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}
