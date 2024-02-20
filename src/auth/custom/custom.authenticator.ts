// import express from 'express';
// import jwt from 'jsonwebtoken';
// import { logger } from '../../logger/logger';
// import { AuthenticationResult } from '../../domain.types/user/auth.domain.types';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
// // import { ClientService } from '../../database/services/client/client.service';
// import { Loader } from '../../startup/loader';
// import { IAuthenticator } from '../authenticator.interface';

// //////////////////////////////////////////////////////////////

// export class CustomAuthenticator implements IAuthenticator {

//     _clientService: ClientService = null;

//     constructor() {
//         this._clientService = Loader.Container.resolve(ClientService);
//     }

//     public authenticateUser = async (
//         request: express.Request
//     ): Promise<AuthenticationResult> => {
//         try {
//             request.authorizeRequest = true;

//             var res: AuthenticationResult = {
//                 Result        : true,
//                 Message       : 'Authenticated',
//                 HttpErrorCode : 200,
//             };

//             const authHeader = request.headers['authorization'];
//             const token = authHeader && authHeader.split(' ')[1];

//             if (token == null) {
//                 var IsPrivileged = request.currentClient.IsPrivileged as boolean;
//                 if (IsPrivileged) {
//                     return res;
//                 }

//                 res = {
//                     Result        : false,
//                     Message       : 'Unauthorized user access',
//                     HttpErrorCode : 401,
//                 };
//                 return res;
//             }

//             jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET, (error, user) => {
//                 if (error) {
//                     res = {
//                         Result        : false,
//                         Message       : 'Forebidden user access',
//                         HttpErrorCode : 403,
//                     };
//                     return res;
//                 }
//                 request.currentUser = user;
//             });

//         } catch (err) {
//             logger.error(JSON.stringify(err, null, 2));
//             res = {
//                 Result        : false,
//                 Message       : 'Error authenticating user',
//                 HttpErrorCode : 401,
//             };
//         }
//         return res;
//     };

//     public authenticateClient = async (request: express.Request): Promise<AuthenticationResult> => {
//         try {

//             request.authorizeRequest = false;

//             var res: AuthenticationResult = {
//                 Result        : true,
//                 Message       : 'Authenticated',
//                 HttpErrorCode : 200,
//             };
//             let apiKey: string = request.headers['x-api-key'] as string;

//             if (!apiKey) {
//                 res = {
//                     Result        : false,
//                     Message       : 'Missing API key for the client',
//                     HttpErrorCode : 401,
//                 };
//                 return res;
//             }
//             apiKey = apiKey.trim();

//             const client: CurrentClient = await this._clientService.isApiKeyValid(apiKey);
//             if (!client) {
//                 res = {
//                     Result        : false,
//                     Message       : 'Invalid API Key: Forebidden access',
//                     HttpErrorCode : 403,
//                 };
//                 return res;
//             }
//             request.currentClient = client;

//         } catch (err) {
//             logger.error(JSON.stringify(err, null, 2));
//             res = {
//                 Result        : false,
//                 Message       : 'Error authenticating client',
//                 HttpErrorCode : 401,
//             };
//         }
//         return res;
//     };

// }
