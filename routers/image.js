const { Router } = require("express");
const Image = require("../models").image;
const router = new Router();

// get all
// router.get("/", async (request, response) => {
//   try {
//     const allImages = await Image.findAll();
//     return response.json(allImages); // promise
//   } catch (error) {
//     console.log(error);
//   }
// });

// get an image by ID
router.get("/:imageId", async (request, response, next) => {
  try {
    const imageId = parseInt(request.params.imageId);
    const imageToUpdate = await Image.findByPk(imageId);
    if (!imageToUpdate) {
      response.status(404).send("Image not found");
    } else {
      const updatedImage = await imageToUpdate.update(request.body);
      response.json(updatedImage);
    }
  } catch (error) {
    next(error);
  }
});

// create an image
router.post("/", async (request, response, next) => {
  try {
    const newImage = await Image.create(request.body);
    response.send(newImage);
  } catch (error) {
    next(error);
  }
});

// update an image
router.put("/:imageId", async (request, response, next) => {
  try {
    const imageId = parseInt(request.params.imageId);
    const imageToUpdate = await Image.findByPk(imageId);
    if (!imageToUpdate) {
      response.status(404).send("Image not found");
    } else {
      const updatedImage = await imageToUpdate.update(request.body);
      response.json(updatedImage);
    }
  } catch (error) {
    next(error);
  }
});

// images with offset, pagination
// router.get("/", (req, res, next) => {
//   const limit = req.query.limit || 25;
//   const offset = req.query.offset || 0;

//   Image.findAll({
//     limit,
//     offset,
//   })
//     .then((images) => {
//       res.send(images);
//     })
//     .catch((error) => next(error));
// });

// get images with total property
router.get("/", (req, res, next) => {
  const limit = Math.min(req.query.limit || 25);
  const offset = req.query.offset || 0;

  Image.findAndCountAll({ limit, offset })
    .then((result) => res.send({ images: result.rows, total: result.count }))
    .catch((error) => next(error));
});

module.exports = router;

// testing route with offset and limit:
// http :4000/images offset==0 limit==2
