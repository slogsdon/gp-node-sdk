declare module "sha1" {
  /**
   * js function for hashing messages with SHA1
   *
   * @param {(string | Buffer)} message - a string or buffer to hash
   * @param {Sha1Options} options - an options object
   * @returns {string} the resultant SHA1 hash of the given message
   */
  var main: (message: string | Buffer, options?: Sha1Options) => string | Uint8Array;
  export = main;

  interface Sha1Options {
      asBytes?: boolean;
      asString?: boolean;
  }
}