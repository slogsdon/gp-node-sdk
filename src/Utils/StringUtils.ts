export class StringUtils {
  public static leftPad(source: string, length: number, padString: string): string {
    const pad = padString.repeat(length);
    return pad.substring(0, pad.length - source.length) + source;
  }
}
