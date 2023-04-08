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
  { label: "Cuisine" },
  { label: "Couture" },
  { label: "Cyclisme" },
  { label: "Danse" },

  { label: "Dessin" },

  { label: "Gastronomie" },
  { label: "Restaurant" },
  { label: "Bar" },
  { label: "Café" },

  { label: "Jardinage" },
  { label: "Jeux de société" },
  { label: "Jeux vidéo" },
  { label: "Lecture" },

  { label: "Musique" },
  { label: "Peinture" },
  { label: "Photographie" },
  { label: "Robotique" },
  { label: "Sciences" },
  { label: "Sport" },
  { label: "Voyage" },
  { label: "Yoga" },
  { label: "Autre" },
]);

db.hobbies.createIndex({ label: 1 }, { unique: true });
