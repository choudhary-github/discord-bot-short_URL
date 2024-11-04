import express from "express";
import { nanoid } from "nanoid";
import type { Request, Response } from "express";
import ShortUrl from "../models/shortUrl";

const app = express();
app.use(express.json());

app.post("/create", (req: Request, res: Response) => {
  const url = req.body?.url;

  if (!url) {
    res.status(400).json({ error: "url is required" });
    return;
  }

  const shortId = nanoid(8);
  ShortUrl.create({ shortId, url, createdBy: req.body?.createdBy });
  res.json({ shortId, url });
});

app.get("/:shortId", async (req: Request, res: Response) => {
  const shortId = req.params?.shortId;
  const url = await ShortUrl.findOne({ shortId });
  if (!url) {
    res.status(404).json({ error: "url not found" });
    return;
  }
  res.redirect(url.url);
});

export { app };
