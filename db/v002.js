
// TODO: Faire la même chose mais pour les 

let hobbiesValidation = {
    "label":{
      "bsonType":"string",
      "description":"label"
    }
}
db.createCollection("hobbies", { validator: { $jsonSchema: { "bsonType": "object", "required": ["label"], "properties": hobbiesValidation } } });
db.users.createIndex( { "email": 1 }, { unique: true } )


