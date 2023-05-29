// TODO: Faire la même chose mais pour les

let hobbiesValidation = {
  label: {
    bsonType: "string",
    description: "label",
  },
};
db.createCollection("hobbies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["label"],
      properties: hobbiesValidation,
    },
  },
});


 db.hobbies.insertMany([
  { id: 1, label: "Cuisine" },
  { id: 2, label: "Couture" },
  { id: 3, label: "Cyclisme" },
  { id: 4, label: "Danse" },

  { id: 5, label: "Dessin" },

  { id: 6, label: "Gastronomie" },
  { id: 7, label: "Restaurant" },
  { id: 8, label: "Bar" },
  { id: 9, label: "Café" },

  { id: 10, label: "Jardinage" },
  { id: 11, label: "Jeux de société" },
  { id: 12, label: "Jeux vidéo" },
  { id: 13, label: "Lecture" },

  { id: 14, label: "Musique" },
  { id: 15, label: "Peinture" },
  { id: 16, label: "Photographie" },
  { id: 17, label: "Robotique" },
  { id: 18, label: "Sciences" },
  { id: 19, label: "Sport" },
  { id: 20, label: "Voyage" },
  { id: 21, label: "Yoga" },
  { id: 22, label: "Autre" },
]);



db.hobbies.createIndex({ label: 1 }, { unique: true });
