import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get("/items", async (req, res) => {

  const items = await knex("items").select("*");

  const serializedItems = items.map(item => {

    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
      image_name: item.image
    };

  })

  return res.json(serializedItems);

});

routes.post("/points", async (req, res) => {

  const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;

    const point_id = await knex("points").insert(
    {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }).returning("id");

    console.log("id",point_id)

    const pointItems = items.map((item_id: number)=> {
      return {
        item_id,
        point_id : point_id[0]
      }
    })

    await knex("point_items").insert(pointItems)

    return res.json({ success: true })

})


export default routes; 