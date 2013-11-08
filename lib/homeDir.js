module.exports = function() {
  return process.env.HOME || process.env.USERPROFILE;
}