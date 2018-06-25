'use strict';

const { getClient } = require('./connect');

class Database {

  constructor(dbName) {
    this.dbName = dbName;
    this.getDb();
    this.collectionObj = {};
  }

  async getDb() {
    if (this.db) return this.db;
    const client = await getClient();
    this.db = client.db(this.dbName);
    return this.db;
  }

  async getCollections() {
    if (this.collections) return this.collections;
    await this.getDb();
    this.collections = await this.db.collections();
    return this.collections;
  }

  async getCollectionNames() {
    await this.getCollections();
    return this.collections.map(c => c.s.name);
  }

  async getCollection(name) {
    if (this.collectionObj[name]) return this.collectionObj[name];
    await this.getDb();
    this.collectionObj[name] = this.db.collection(name);
    return this.collectionObj[name];
  }
}

module.exports = Database;
