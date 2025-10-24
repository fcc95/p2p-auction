export const parseJson = <T>(buf: Buffer): T | null => {
  try {
    return JSON.parse(buf.toString("utf8")) as T;
  } catch {
    return null;
  }
};
