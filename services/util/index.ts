import { v4 } from "uuid";

class Util {
  static makeUUID() {
    return v4();
  }

  static makeUTCNow() {
    return new Date().toISOString();
  }

  static sleep(duration = 5000): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("awake!");
      }, duration);
    });
  }
}

export default Util;
