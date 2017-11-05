"use babel";

export default async function changeDirectoryForPromise(
  directory,
  createPromise
) {
  const originalCwd = process.cwd();
  process.chdir(directory);
  try {
    return await createPromise();
  } finally {
    process.chdir(originalCwd);
  }
}
