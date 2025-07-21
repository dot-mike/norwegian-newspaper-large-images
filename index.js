const fs = require("fs");
const archiver = require("archiver");
const path = require('path');

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
  if (process.env.CWU_EXTENSION_ID) {
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
  else {
    console.info("Skipping Chrome publishing due to missing environment");
  }
}

async function publishToFirefox(sourcePath, artifactsPath) {
  if (process.env.WEB_EXT_API_KEY && process.env.WEB_EXT_API_SECRET) {
    const webExt = require('web-ext').default;

    const signOptions = {
      sourceDir: sourcePath,
      artifactsDir: artifactsPath,
      channel: 'unlisted',
      apiKey: process.env.WEB_EXT_API_KEY,
      apiSecret: process.env.WEB_EXT_API_SECRET
    };

    // Only add ID if it's provided and not empty
    if (process.env.WEB_EXT_ID && process.env.WEB_EXT_ID.trim() !== '') {
      signOptions.id = process.env.WEB_EXT_ID;
    }

    webExt.cmd.sign(signOptions, {
      shouldExitProgram: false,
    }).then(reason => {
      console.log("Finished publishing to Firefox:", reason);
    }).catch(reason => {
      console.log("Error publishing to Firefox:", reason);
    });
  }
  else {
    console.info("Skipping Firefox publishing due to missing API credentials");
  }
}

async function updateManifestVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const version = packageJson.version;

  const manifestPath = path.join('src', 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  manifest.version = version;

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`Updated manifest.json version to ${version}`);
}

async function build() {
  console.log('Building extension...');
  await updateManifestVersion();
  
  if (!fs.existsSync(DIST_FOLDER)) {
    fs.mkdirSync(DIST_FOLDER);
  }
  
  await zipDirectory(`./${SOURCE_FOLDER}`, `./${DIST_FOLDER}/${ZIP_FILENAME}`);
  console.log('Build completed successfully!');
}

async function publish() {
  require('dotenv').config();
  console.log('Publishing extension...');
  
  await build();
  
  await publishToChrome(`./${DIST_FOLDER}/${ZIP_FILENAME}`);
  await publishToFirefox(SOURCE_FOLDER, DIST_FOLDER);
  
  console.log('Publish completed successfully!');
}

const command = process.argv[2];

if (command === 'publish') {
  publish().catch(err => {
    console.error('Failure during publishing:', err);
    process.exit(1);
  });
} else {
  build().catch(err => {
    console.error('Failure during build:', err);
    process.exit(1);
  });
}
