const fs = require("fs");
const archiver = require("archiver");

require('dotenv').config();
const ZIP_FILENAME = "norwegian-newspaper-large-images.zip";

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
  console.log("Finished uploading:", result);
  if (result.uploadState != "SUCCESS") {
    throw new Error(result);
  }

  result = await webStore.publish('default', token);
  console.log("Finished publishing:", result);
  if (result.status[0] != 'OK') {
    throw new Error(result);
  }
}

async function processDeploy() {
  await zipDirectory("./src", `./${ZIP_FILENAME}`);
  await publishToChrome(`./${ZIP_FILENAME}`);
}

processDeploy().catch(err => {
  console.error('Failure during deployment:', err);
});
