import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as ftp from "basic-ftp";
import * as dotenv from "dotenv";

dotenv.config({ override: true });

const { HOSTNAME, USERNAME, PASSWORD, REMOTE_DIR } = process.env;

const LOCAL_DIR =
  process.env.LOCAL_DIR && path.join(__dirname, process.env.LOCAL_DIR);

if (!HOSTNAME || !USERNAME || !PASSWORD || !LOCAL_DIR || !REMOTE_DIR) {
  console.error("Environment variables not properly configured!");
  process.exit(1);
}

async function checkSitePath(): Promise<void> {
  try {
    const stats = await fs.stat(LOCAL_DIR!);

    if (!stats.isDirectory()) {
      throw new Error(`'${LOCAL_DIR}' is not a folder.`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error(`There is no '${LOCAL_DIR}'-folder.`);
    } else {
      throw error;
    }
  }
}

async function rename404(): Promise<void> {
  console.log("Renaming '404.html' to '404.shtml'");
  const src = path.join(LOCAL_DIR!, "404.html");
  const tgt = path.join(LOCAL_DIR!, "404.shtml");
  await fs.rename(src, tgt);
}

async function undo404(): Promise<void> {
  console.log("Renaming '404.shtml' to '404.html'");
  const src = path.join(LOCAL_DIR!, "404.shtml");
  const tgt = path.join(LOCAL_DIR!, "404.html");
  await fs.rename(src, tgt);
}

async function main(): Promise<void> {
  const client = new ftp.Client(60000);

  try {
    console.log("Running post-build tasks...");
    await rename404();

    console.log("Attempting to upload files...");
    await checkSitePath();

    await client.access({
      host: HOSTNAME,
      user: USERNAME,
      password: PASSWORD,
    });

    console.log("Connected to FTP...");

    await client.ensureDir(REMOTE_DIR!);

    await client.clearWorkingDir();
    console.log("Cleared old files...");

    await client.uploadFromDir(LOCAL_DIR!);
    console.log("Uploaded new files...");
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    client.close();
    console.log("Running post-build tasks...");
    await undo404();

    console.log("Done.");
  }
}

main().catch((error) => {
  console.error(error);
});
