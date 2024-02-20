import 'reflect-metadata';
import express from 'express';
import { IAuthenticator } from './authenticator.interface';
import { injectable, inject } from "tsyringe";

import { ResponseHandler } from '../common/handlers/response.handler';
import { logger } from '../logger/logger';
import { ErrorHandler } from '../common/handlers/error.handler';

////////////////////////////////////////////////////////////////////////

@injectable()
export class Authenticator {

    constructor(
        @inject('IAuthenticator') private _authenticator: IAuthenticator
    ) {}

    public authenticateUser = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<boolean> => {
        try {
            const authResult = await this._authenticator.authenticateUser(request);
            if (authResult.Result === false){
                ResponseHandler.failure(request, response, authResult.Message, authResult.HttpErrorCode);
                return false;
            }
            next();
        } catch (error) {
            logger.error(error.message);
            ResponseHandler.failure(request, response, 'User authentication error: ' + error.message, 401);
        }
    };

    public verifyUser = async (request: express.Request): Promise<boolean> => {
        const authResult = await this._authenticator.authenticateUser(request);
        return authResult.Result;
    };

    public authenticateClient = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<boolean> => {
        try {
            const authResult = await this._authenticator.authenticateClient(request);
            if (authResult.Result === false){
                ResponseHandler.failure(request, response, authResult.Message, authResult.HttpErrorCode);
                return false;
            }
            next();
        } catch (error) {
            logger.error(error.message);
            ResponseHandler.failure(request, response, 'Client authentication error: ' + error.message, 401);
        }
    };

    public checkAuthentication = async(request: express.Request): Promise<boolean> => {
        const clientAuthResult = await this._authenticator.authenticateClient(request);
        if (clientAuthResult.Result === false){
            ErrorHandler.throwInternalServerError('Unauthorized access', 401);
        }
        const userAuthResult = await this._authenticator.authenticateUser(request);
        if (userAuthResult.Result === false){
            ErrorHandler.throwInternalServerError('Unauthorized access', 401);
        }
        return true;
    };

}

////////////////////////////////////////////////////////////////////////
