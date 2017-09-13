import Osmos from 'osmos-lite';
var Schema = Osmos.Schema;
var Model = Osmos.Model;
var Document = Osmos.Document;
Document.prototype.toJSON = Document.prototype.toRawJSON;

import config from '../../config';
import path from 'path';
import fs from 'fs';
import cuid from 'cuid';


var Models = {};

// read schemas.config.json
var schemasConfig = JSON.parse(fs.readFileSync(`${config.schemasDir}/schemas.config.json`));

schemasConfig.forEach(schemaInfo => {
  // read file content
  let jsonSchemaRaw = JSON.parse(fs.readFileSync(`${config.schemasDir}/${schemaInfo.json_schema_file}`));
  // add necessary schema type
  jsonSchemaRaw.$schema = "http://json-schema.org/draft-04/schema#";
  // remove extension from file name
  var collection = schemaInfo.collection_name;
  // deep-copy raw schema for adding properties
  var jsonSchema = JSON.parse(JSON.stringify(jsonSchemaRaw));
  //jsonSchema.additionalProperties = true;
  // add necessary internal properties
  jsonSchema.properties.cuid = {
    type: "string"
  };
  jsonSchema.properties.slug = {
    type: "string"
  };
  jsonSchema.properties.date_added = {
    type: "string"
  };
  // create Schema object
  var schema = new Schema(`schema-${schemaInfo.name}`, jsonSchema);
  //console.log(jsonSchema);
  // add necessary primary key
  schema.primaryKey = 'cuid';
  // create Model object
  var model = new Model(`Model-${collection}`, schema, collection, 'db');
  model.updateableProperties = Object.keys(jsonSchema.properties);
  // Add model instance methods
  model.getJSONSchema = () => {
    return jsonSchemaRaw;
  };
  model.findNoValidate = function(spec, cb) {
    return this.db.find(this, spec).nodeify(cb);
  }.bind(model);
  model.createAndInit = function(cb) {
    return this.create()
    .then(doc => {
      doc.cuid = cuid();
      doc.date_added = new Date().toISOString();
      return doc;
    }).nodeify(cb);
  }.bind(model);
  model.createMany = function(items, cb) {
    var promises = items.map(item => {
      return this.createAndInit()
      .then(doc => {
        for (var prop in item) {
          doc[prop] = item[prop];
        }
        return doc.save();
      })
    })
    return Promise.all(promises);
  }.bind(model);
  // add model to Models
  Models[collection] = model;
});

export default Models;
