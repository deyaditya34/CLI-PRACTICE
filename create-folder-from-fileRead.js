const fs = require("fs");
const readline = require("readline");

const start = (fileName) => {
  const fsReadStream = fs.createReadStream(fileName);

  const lineFeed = readline.createInterface(fsReadStream);

  lineFeed.on("line", processLine);

  fsReadStream.on("error", (err) => {
    console.log(err);
  });

  fsReadStream.on("close", () => {
    lineFeed.close();
    console.log("folder created");
  });
};

start("C:\\Users\\user\\Documents\\Programs\\cli-practice\\folder-list.txt");

function processLine(folderPath) {
  fs.mkdirSync(folderPath);
}
