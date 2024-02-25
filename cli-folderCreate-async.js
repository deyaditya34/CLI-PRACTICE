const fs = require("fs");
const path = require("path");
const readline = require("readline");

const processLine = (outputDirectory) => (folderName) => {
  if (!outputDirectory) {
    fs.mkdirSync(folderName);
  } else {
    const outDirPath = path.join(outputDirectory, folderName);
    const outputDirectoryExists = fs.existsSync(outputDirectory);

    if (!outputDirectoryExists) {
      fs.mkdirSync(outputDirectory);
    }
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

const processArgv = process.argv;

if (processArgv.length === 3) {
  start(processArgv[2]);
}

if (processArgv.length === 4) {
  start(processArgv[2], processArgv[3]);
}
