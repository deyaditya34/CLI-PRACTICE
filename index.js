const fs = require("fs");
const path = require("path");
const readline = require("readline");

const processLine = (outputDirectory) => (folderName) => {
  if (!outputDirectory) {
    fs.mkdirSync(folderName);
  } else {
    const outDirPath = path.join(outputDirectory, folderName);
    fs.mkdirSync(outDirPath);
  }
};

const start = (readFilePath, outputDirectory = "") => {
  const fsReadStream = fs.createReadStream(readFilePath);

  const lineFeed = readline.createInterface(fsReadStream);

  lineFeed.on("line", processLine(outputDirectory));

  fsReadStream.on("error", (err) => {
    console.log(err);
  });

  fsReadStream.on("close", () => {
    lineFeed.close();
    console.log("folder created");
  });
};

// start("C:\\Users\\user\\Documents\\Programs\\cli-practice\\folder-list.txt",  "C:\\Users\\user\\Documents\\Programs\\cli-practice\\outputFileFolder");

const processArgv = process.argv

if (processArgv.length > 2) {
  start(processArgv[2])
}