import shortid from "shortid";
import { URL } from "../models/url.js";
export async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    userId: body.userId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

export async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (result == null) {
    return res
      .status(404)
      .json({ error: "No URL found for the given short URL" });
  } else {
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
      data: result,
    });
  }
}

export async function handleUserAnalytics(req, res) {
  const userId = req.params.userId;
  const result = await URL.find({ userId });
  if (result == null) {
    return res.status(404).json({ error: "No URL found for the given USEr " });
  } else {
    return res.json({
      result,
    });
  }
}

export async function handleDelete(req, res) {
  const shortId = req.body.shortId;

  try {
    const result = await URL.deleteOne({ shortId });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "deleted" });
    } else {
      return res.status(404).json({ message: "error in deleting" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleEdit(req, res) {
  const shortId = req.body.shortId;
  const newUrl = req.body.newUrl;
  console.log(`${shortId}  ,  ${newUrl}`);
  try {
    const result = await URL.updateOne({ shortId }, { redirectURL: newUrl });
    console.log(result);

    if (result.acknowledged === false || result.modifiedCount < 1) {
      return res.status(404).json({ message: "error in updating" });
    } else {
      return res.status(200).json({ message: "updated" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
