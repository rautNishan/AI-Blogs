import express from "express";

import { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("This is Js is ts");
});

app.get("/next", (req: Request, res: Response) => {
  res.send("Thanks");
});
app.listen(port, () => console.log("Listing"));
