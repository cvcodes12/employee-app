/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1939350121",
    "max": null,
    "min": null,
    "name": "jon",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_346498674")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1939350121",
    "max": null,
    "min": null,
    "name": "roll_no",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
