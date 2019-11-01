const fs = require("fs");
const archiver = require("archiver");

const ZIP_FILENAME = "norwegian-newspaper-large-images.zip";
const SOURCE_FOLDER = "src";
const DIST_FOLDER = "dist";

async function zipDirectory(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", err => {
        reject(err);
      })
      .pipe(stream);

    stream.on("finish", () => {
      console.log("Finished zipping");
      resolve();
    });

    archive.finalize();
  });
}

async function publishToChrome(zipFilePath) {
  const zipFile = fs.createReadStream(zipFilePath);
  let result;
  const webStore = require("chrome-webstore-upload")({
    extensionId: process.env.CWU_EXTENSION_ID,
    clientId: process.env.CWU_CLIENT_ID,
    clientSecret: process.env.CWU_CLIENT_SECRET,
    refreshToken: process.env.CWU_REFRESH_TOKEN
  });

  const token = await webStore.fetchToken();
  result = await webStore.uploadExisting(zipFile, token);
  console.log("Finished uploading to Chrome:", result);
  if (result.uploadState != "SUCCESS") {
    throw new Error(result);
  }

  result = await webStore.publish('default', token);
  console.log("Finished publishing to Chrome:", result);
  if (result.status[0] != 'OK') {
    throw new Error(result);
  }
}

async function publishToFirefox(sourcePath, artifactsPath) {
  const webExt = require('web-ext').default;

  webExt.cmd.sign({
    sourceDir: sourcePath,
    artifactsDir: artifactsPath,
    channel: 'listed',
    id: process.env.WEB_EXT_ID,
    apiKey: process.env.WEB_EXT_API_KEY,
    apiSecret: process.env.WEB_EXT_API_SECRET
  }, {
    shouldExitProgram: false,
  }).then(reason => {
    console.info("Finished publishing to Firefox:", reason);
  }).catch(reason => {
    console.info("Finished publishing to Firefox:", reason);
  });
}

async function processDeploy() {
  require('dotenv').config();
  await zipDirectory(`./${SOURCE_FOLDER}`, `./${DIST_FOLDER}/${ZIP_FILENAME}`);
  await publishToChrome(`./${DIST_FOLDER}/${ZIP_FILENAME}`);
  await publishToFirefox(SOURCE_FOLDER, DIST_FOLDER);
}

processDeploy().catch(err => {
  console.error('Failure during deployment:', err);
});
