const express = require("express");
const webpush = require("web-push");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

//set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyparser.json);

const publicVapidKey =
  "BPhOKk6oJEuTlPMXXgXDroD5oUfK7a9sC9FFKzuD5EUpZNysXxEZPJOXpR_mIugxAnalCeGMEbx0wMb_cswo3dY";
const privateVapidKey = "zVwyyK5uS3boMZzW0yKzLh2YOriE6SQsJWJ-nfyuYRE";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//subscribe route
app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  console.log('inside server post method');

  
  //send 201
  res.status(201).json({});

  //create payload
  const payload = JSON.stringify({ title: "Push Title" });

  //pass object into send notification functions
  webpush.sendNotification(subscription, payload).catch((err) => {
    console.error(err);
  });
});

const port = 5000;

app.listen(port, () => console.log(`server start on  port ${port}`));
