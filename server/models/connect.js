'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let client;
let adminDb;

async function getClient() {
  if (client) return client;
  client = await MongoClient.connect(url);
  return client;
}

async function getAdminDb() {
  if (adminDb) return adminDb;
  const dbName = 'test';
  const client = await getClient();
  adminDb = client.db(dbName).admin();
  return adminDb;
}

async function closeClient() {
  const client = await getClient();
  client.close();
}

async function listDatabases() {
  const adminDb = await getAdminDb();
  return await adminDb.listDatabases();
}

module.exports = {
  getClient,
  getAdminDb,
  closeClient,
  listDatabases
};
