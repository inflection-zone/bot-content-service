# System Design Documentation

## Goals of the Current System Design

The current system design emphasizes the freedom to choose individual components in multiple areas. The service provides default modules but supports the replacement of these modules with custom ones. The areas supporting replicable modules include:

- *Database Engines:* Through a basic repository interface, supporting any SQL database through TypeORM (Tested with MySQL).

## Technology Stack

1. Node.js
2. TypeScript
3. TypeORM
4. MySQL

## Recommended Tools on Development Machine

- Visual Studio Code with the following extensions:
  - ESLint
  - DotENV
  - Prettier Code Formatter by Prettier
- MySQL Workbench
- Postman

## Setup

- Database migration is done automatically on launching the application.
- Testing the service with Postman: A comprehensive set of Postman requests is available in the collection 'bot-content-service.postman_collection.json'.
- Import the Postman collection JSON file.
- It is advisable to execute the requests in sequential order from top-to-bottom.

## System Goals

1. *Open Architecture:*
   - Allow for different types of Documents (text, image, audio) by defining an interface for Document types.
   - Users can define custom Document types that implement this interface.

2. *Versioning and History:*
   - Support versioning of Documents and track changes over time.
   - Store historical versions of Documents and provide APIs to retrieve and manage these versions.

3. *Scalability and Performance:*
   - Design the service to be scalable and performant, especially with a large number of Documents.

4. *Audit Logging and Monitoring:*
   - Implement audit logging to track actions performed on Documents.
   - Monitoring to ensure the service is performing as expected.

5. *Customization and Extensibility:*
   - Allow users to customize and extend the service to meet specific needs.
   - Provide hooks or APIs for adding custom logic or integrating with external systems.

## Service Purpose

The Document Management Service handles the creation, organization, storage, retrieval, and maintenance of documents within a system. It ensures seamless document management, making documents easily accessible, versioned, and secured.

## Key Components

1. *Document Entity:*
   - Represents a document with attributes such as content, metadata, version history, and permissions.

2. *Document Repository:*
   - Manages the storage and retrieval of document entities, abstracting the underlying data storage technology for scalability and performance.

3. *Document Service:*
   - Implements business logic related to document management, including validation, access control, versioning, and integration with other services.

4. *Search and Indexing Module:*
   - Provides efficient search capabilities and indexing of document content for quick retrieval.

5. *Security and Access Control:*
   - Enforces access control policies to ensure authorized users can create, view, edit, or delete documents.

## Design Considerations

- *Scalability:*
  - Design the service to handle a large volume of documents and user interactions for future growth.

- *Versioning:*
  - Implement a robust version control system to track changes to documents over time, allowing users to review and revert to previous versions.

- *Integration:*
  - Ensure seamless integration with other services within the system for a cohesive user experience and data flow.

- *Audit Trail:*
  - Maintain an audit trail to track actions performed on documents, aiding accountability and compliance requirements.

- *Extensibility:*
  - Provide a way to define and manage different types of Documents for users to customize based on their needs.

- *Integration:*
  - Integrate with other services or APIs, such as language models or natural language processing services, to enhance Document generation and processing capabilities.

- *Versioning:*
  - Support versioning of Documents to track changes and enable rollback to previous versions if needed.

- *Performance:*
  - Optimize for performance, especially for operations like Document retrieval and generation, to ensure fast response times even with large volumes of Documents.

## Control Flow of the System

1. Incoming request is processed through a standard set of middlewares.
2. Requests are gathered in the router file for specific routing.
3. Validators process the request input and convert it to domain models (Validation is done by the Joi library).
4. Controllers accept domain models and call one or more services based on business logic.
5. Services pass the domain models to database repository interfaces.
6. Database repository interfaces convert domain models to database models and perform relevant actions.
7. The database models returned by the database ORM are converted by repository interfaces into DTOs.
8. Controllers embed DTOs into the response.
9. Response is served.