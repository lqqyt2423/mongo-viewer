'use strict';

const express = require('express');
const wrap = require('./utils/wrap');
const { listDatabases } = require('./models/connect');
const Database = require('./models/database');

const app = express();

app.get('/databases', wrap(async (req, res) => {
  const databases = await listDatabases();
  res.json(databases);
}));

app.get('/:database/collections', wrap(async (req, res) => {
  const { database } = req.params;
  const databases = (await listDatabases()).databases.map(d => d.name);
  if (!~databases.indexOf(database)) throw new Error('不存在此数据库');
  const db = new Database(database);
  res.json(await db.getCollectionNames());
}));

app.get('/:d/:c/docs', wrap(async (req, res) => {
  const { d, c } = req.params;
  const dbs = (await listDatabases()).databases.map(d => d.name);
  if (!~dbs.indexOf(d)) throw new Error('不存在此数据库');
  const db = new Database(d);
  const collections = await db.getCollectionNames();
  if (!~collections.indexOf(c)) throw new Error('不存在此表');
  const co = await db.getCollection(c);
  const cursor = co.find({}, { limit: 20 });
  res.json(await cursor.toArray());
}));

module.exports = app;
