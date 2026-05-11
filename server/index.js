const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const audits = [];

app.get("/", (req, res) => {
  res.send("AIStack Audit Backend Running");
});

app.post("/save-audit", (req, res) => {

  const audit = {
    id: uuidv4(),
    ...req.body,
  };

  audits.push(audit);

  res.json({
    success: true,
    audit,
  });

});

app.get("/audit/:id", (req, res) => {

  const audit = audits.find(
    (item) => item.id === req.params.id
  );

  if (!audit) {

    return res.status(404).json({
      error: "Audit not found",
    });

  }

  res.json(audit);

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});