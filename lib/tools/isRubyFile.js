"use babel";

// TODO: Check the scope of the path instead of just the file name so Gemfile and Rakefile
//       can pass this test.
export default function isRubyFile(filePath) {
  return filePath.endsWith(".rb");
}
