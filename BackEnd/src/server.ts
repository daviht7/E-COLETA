import express from 'express';
import routes from './routes'

const app = express();

app.use(express.json());

app.use(routes);

app.post("/",(req,res) => {
  return res.json(req.body)

})

app.listen(3333);