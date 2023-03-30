let userValidation = {
    "nom":{
      "bsonType":"string",
      "description":"nom"
    },
    "prenom":{
      "bsonType":"string",
      "description":"prenom"
    },
    "telephone":{
        "bsonType":"string",
        "description":"telephone"
    },
    "email":{
        "bsonType":"string",
        "description":"email"
    },
    "password":{
        "bsonType":"string",
        "description":"password"
    },
    "createdAt":{
        "bsonType":"date",
        "description":"dateCreation"
    }
}
db.createCollection("users", { validator: { $jsonSchema: { "bsonType": "object", "required": ["nom", "prenom", "telephone", "password","email"], "properties": userValidation } } });
db.users.createIndex( { "email": 1 }, { unique: true } )
