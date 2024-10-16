import { v4 } from "uuid";

class Util {
  static makeUUID() {
    return v4();
  }

  static makeUTCNow() {
    return new Date(new Date().toISOString());
  }
}

export default Util;
