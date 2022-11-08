const collectionName = 'UserTable';
const mongoDbConfig = require('./mongo.config');
module.exports = {
    getObjects: (filter) => {
        return new Promise(async (resolve) => {
            const result = await mongoDbConfig
                .getDb()
                .collection(collectionName)
                .find(filter).toArray();
            resolve(result);
        });
    },
    insertObjects: (userSchema) => {
        return new Promise(async (resolve) => {
            const insertedItem = await mongoDbConfig
                .getDb()
                .collection(collectionName)
                .insertOne(userSchema);
            resolve(insertedItem);
        });
    }
}