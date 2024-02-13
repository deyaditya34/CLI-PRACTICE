const fs = require("fs");
const path = require("path");
const readline = require("readline");

const readFilePath = process.argv[2];
const outputDir = process.argv[3];

if (!readFilePath) {
  process.stdout.write(`usage: node <filename> <readFilePath> <outputDir>\n`);
  process.exit(-1);
}

start(readFilePath, outputDir).catch((err)=> {
    process.stdout.write("[api error] -", err)
});


async function start(readFilePath, outputDir = "") {
  const fsReadStream = fs.createReadStream(readFilePath);

  const lineFeed = readline.createInterface(fsReadStream);

  for await (const line of lineFeed) {
    const outDirPath = path.join(outputDir, line.toString());
    console.log("outputDirPath -", outDirPath)
    fs.mkdirSync(outDirPath, { recursive: true });
  }
}
