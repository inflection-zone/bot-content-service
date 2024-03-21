import request from 'supertest';
import { expect } from 'chai';
import Application from '../../src/app';
import { describe, it } from 'mocha';
import { getTestData, setTestData } from '../init';
import { faker } from '@faker-js/faker';

const infra = Application.instance();

///////////////////////////////////////////////////////////////////////////

describe('Qna Document Group tests', function () {
    var agent = request.agent(infra._app);

    it(' Create qna document group record', function (done) {
        loadQnaDocumentGroupCreateModel();
        const createModel = getTestData('QnaDocumentGroupCreateModel');
        agent
            .post(`/api/v1/documentgroups`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .send(createModel)
            .expect((response) => {
                setTestData(response.body.Data.id, 'QnaDocumentGroupId_1');

                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');

                setTestData(response.body.Data.id, 'QnaDocumentGroupId_1');

                expect(response.body.Data.Name).to.equal(getTestData('QnaDocumentGroupCreateModel').Name);
                expect(response.body.Data.Description).to.equal(getTestData('QnaDocumentGroupCreateModel').Description);
            })
            .expect(201, done);
    });

    it('Get qna document group by id', function (done) {
        agent
            .get(`/api/v1/documentgroups/${getTestData('QnaDocumentGroupId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');

                expect(response.body.Data.Name).to.equal(getTestData('QnaDocumentGroupCreateModel').Name);
                expect(response.body.Data.Description).to.equal(getTestData('QnaDocumentGroupCreateModel').Description);
            })

            .expect(200, done);
    });

    it('Update qna document group ', function (done) {
        loadQnaDocumentGroupUpdateModel();
        const updateModel = getTestData('QnaDocumentGroupUpdateModel');
        agent
            .put(`/api/v1/documentgroups/${getTestData('QnaDocumentGroupId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .send(updateModel)
            .expect((response) => {
                expect(response.body.Data).to.have.property('id');
                expect(response.body.Data).to.have.property('Name');
                expect(response.body.Data).to.have.property('Description');

                expect(response.body.Data.Name).to.equal(getTestData('QnaDocumentGroupUpdateModel').Name);
                expect(response.body.Data.Description).to.equal(getTestData('QnaDocumentGroupUpdateModel').Description);
            })
            .expect(200, done);
    });

    it('Delete qna document group', function (done) {
        agent
            .delete(`/api/v1/documentgroups/${getTestData('QnaDocumentGroupId_1')}`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData('PatientJwt')}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })
            .expect(200, done);
    });

    it(' qna document group getAll', function (done) {
        agent
            .get(`/api/v1/documentgroups/all/`)
            .set('Content-Type', 'application/json')
            // .set('x-api-key', `${process.env.TEST_API_KEY}`)
            // .set('Authorization', `Bearer ${getTestData("PatientJwt")}`)
            .expect((response) => {
                expect(response.body).to.have.property('Status');
                expect(response.body.Status).to.equal('success');
            })

            .expect(200, done);
    });

    it('06:03 -> Search qna document group records', function (done) {
        loadOrganizationQueryString();
        agent
            .get(`/api/v1/documentgroups/search${loadOrganizationQueryString()}`)
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

export const loadQnaDocumentGroupCreateModel = async () => {
    const model = {
        Name: faker.person.fullName(),
        Description: faker.lorem.words(10),
    };

    setTestData(model, 'QnaDocumentGroupCreateModel');
};

export const loadQnaDocumentGroupUpdateModel = async () => {
    const model = {
        Name: faker.person.fullName(),
        Description: faker.lorem.words(10),
    };
    setTestData(model, 'QnaDocumentGroupUpdateModel');
};

function loadOrganizationQueryString() {
    //This is raw query. Please modify to suit the test
    const queryString = '';
    return queryString;
}
