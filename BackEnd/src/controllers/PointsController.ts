
import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {

  async create(req: Request, res: Response) {

    const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;

    try {
      const trx = await knex.transaction();

      const point =
      {
        image: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      }

      const point_id = await trx("points").insert(point).returning("id");

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id: point_id[0]
        }
      })

      const item_list = await trx("point_items").insert(pointItems).returning("item_id");

      await trx.commit();

      return res.json({ point_id: point_id[0], ...point, item_list })

    } catch (err) {
      return res.json({ error: err })
    }

  }

  async index(req: Request, res: Response) {

    const { city,uf,items } = req.query;

    const parsedItems = String(items)
    .split(",").map(item => Number(item.trim()))

    const points = await knex("points")
    .join("point_items","points.id", "=", "point_items.point_id")
    .whereIn("point_items.item_id", parsedItems)
    .where("city", String(city))
    .where("uf",String(uf))
    .distinct()
    .select("points.*");

    return res.json(points);

  }

  async show(req: Request, res: Response) {

    const { id } = req.params;
    const point = await knex("points").where('id', id).first();

    if (!point) return res.status(400).json({ error: "Point not found." })

    const items = await knex("items")
      .join("point_items", 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select("items.title");

    return res.json({ point, items });

  }

};


export default PointsController;