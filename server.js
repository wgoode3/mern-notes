const express = require("express");
const cors = require("cors");
const port = 8000;
const dbname = "some_notes";

const app = express();
app.use(cors());
app.use(express.json());

require("./server/config/database.config")(dbname);
require("./server/routes/note.routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));