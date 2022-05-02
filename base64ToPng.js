const fs = require("fs");
const path = require("path");
const obj = JSON.parse(fs.readFileSync("./capture.json", "utf8"));

for ([key, value] of Object.entries(obj)) {
  const base64Data = value.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync(
    path.join(__dirname, `/output/${key}.png`),
    base64Data,
    "base64"
  );
}
