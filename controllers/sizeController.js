// const express = require('express')
const factory = require('./handlerFactory');

const size = require('../models/Size');
// const Subsize = require('../models/Subsize')

exports.getAll = factory.getAll(size);
exports.creatsize = factory.createOne(size);
exports.getOne = factory.getOne(size);
exports.editById = factory.updateOne(size);
exports.deleteById = factory.deleteOne(size);
