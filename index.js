import cors from "cors";
import express from "express";
import DataBaseConnect from "./connect.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";
import { URL } from "./models/url.js";

const app = express();
const PORT = 8001;

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", ""],
};

app.use(cors(corsOptions));

DataBaseConnect(
  "mongodb+srv://arnab192023:1234@url-short.apfjdje.mongodb.net/short-url"
).then(() => console.log("Mongodb connected"));

app.use(express.json());
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("No URL found for the given short URL");
  } else {
    return res.redirect(entry.redirectURL);
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
