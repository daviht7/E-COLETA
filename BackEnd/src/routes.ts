import express from 'express';

import PointsController from '../src/controllers/PointsController'
import ItemsController from '../src/controllers/ItemsController'

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.post("/points", pointsController.create);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.get("/items", itemsController.getItems);


export default routes; 