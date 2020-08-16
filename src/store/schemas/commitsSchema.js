import { schema } from 'normalizr';
import { developerSchema } from './developersSchema';

export const ENTITY_COMMIT = 'commits';
export const commitSchema = new schema.Entity(
    ENTITY_COMMIT, 
    { developer: developerSchema}, 
    {
        idAttribute: 'sha', 
        processStrategy: (entity) => {
            //TODO: Use destructuring here
            return {
                sha: entity.sha,
                parents: entity.parents.map(parent => parent.sha),
                message: entity.commit.message,
                date: entity.commit.author.date,
                developer: { name: entity.commit.author.name, email: entity.commit.author.email, removed: false },
                removed: false,
                selected: false
            }
        }
    }
);
export const commitCollectionSchema = new schema.Array(commitSchema);

commitSchema.define({
    parents: commitCollectionSchema
})