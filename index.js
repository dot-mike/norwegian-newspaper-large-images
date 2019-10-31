const fs = require("fs");
const archiver = require("archiver");

const ZIP_FILENAME = "norwegian-newspaper-large-images.zip";

async function zipDirectory(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  archive
    .directory(source, false)
    .on("error", err => {
      throw new Error(err);
    })
    .pipe(stream);

  stream.on("close", () => {
    return;
  });
  archive.finalize();
}

async function publishToChrome(zipFile) {
  let result;
  const webStore = require("chrome-webstore-upload")({
    extensionId: process.env.CWU_EXTENSION_ID,
    clientId: process.env.CWU_CLIENT_ID,
    clientSecret: process.env.CWU_CLIENT_SECRET,
    refreshToken: process.env.CWU_REFRESH_TOKEN
  });

  const token = await webStore.fetchToken();
  result = await webStore.uploadExisting(zipFile, token);
  if (result.uploadState != "SUCCESS") {
    console.error(result);
    throw new Error(result);
  }

  result = await webStore.publish(token);
  if (result.uploadState != "SUCCESS") {
    console.error(result);
    throw new Error(result);
  }
}

async function processDeploy() {
  await zipDirectory("./src", `./${ZIP_FILENAME}`);
  console.log("Finished zipping.");
  const myZipFile = fs.createReadStream(`./${ZIP_FILENAME}`);
  await publishToChrome(myZipFile);
  console.log("Finished deploying.");
}

processDeploy().catch(reason => {
  console.error(reason);
});
