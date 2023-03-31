const express = require("express");

const multer = require("multer"); // Thư viện hỗ trợ upload file
const upload = multer({ dest: "uploads/" }); // Thư mục để lưu ảnh

const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
// // HTTP logger
// app.use(morgan("combined"));

// template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Home, search, contact

// Route init
route(app);

app.post("/upload-image", upload.single("image"), (req, res) => {
  // Xử lý file ảnh tại đây
  const file = req.file;
  console.log(file);

  // Trả về kết quả thành công
  res.send("Upload successful");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
