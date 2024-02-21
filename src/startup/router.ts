import express from "express";
import { logger } from "../logger/logger";
import { register as registerQnaDocumentGroup } from '../../src/api/content/qna.document.group/qna.document.groups.routes';
import { register as registerQnaDocument } from '../../src/api/content/qna.documents/qna.document.routes';
////////////////////////////////////////////////////////////////////////////////////

export class Router {

    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {

                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message : `Content Service API [Version ${process.env.API_VERSION}]`,
                    });
                });

                registerQnaDocumentGroup(this._app);
                registerQnaDocument(this._app);

                resolve(true);

            } catch (error) {
                logger.error('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };

}
