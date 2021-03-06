import { GraphQLClient } from './graphql-client';
import {DocumentNode, execute, ExecutionResult, GraphQLSchema, validate} from 'graphql';

export class LocalGraphQLClient implements GraphQLClient {
    constructor(public readonly schema: GraphQLSchema) {

    }

    async execute(query: DocumentNode, variables?: { [name: string]: any }, context?: any): Promise<ExecutionResult> {
        const validationErrors = validate(this.schema, query);
        if (validationErrors.length > 0) {
            return {errors: validationErrors};
        } else {
            return await execute(this.schema, query, {}, context, variables);
        }
    }
}
