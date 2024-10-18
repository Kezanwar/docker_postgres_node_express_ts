import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "@app/config";

type Payload = string | Buffer;
type Token = string;

class Auth {
  //jwt sign
  static jwtSign15Mins(payload: Payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  }
  static jwtSign30Days(payload: Payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
  }
  static jwtSign365Days(payload: Payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "365d" });
  }
  //jwt verify
  static jwtVerify(token: Token) {
    return jwt.verify(token, JWT_SECRET);
  }

  static #auth_methods = {
    jwt: "jwt",
    google: "google",
  };

  static get jwtAuthMethod() {
    return this.#auth_methods.jwt;
  }

  static get googleAuthMethod() {
    return this.#auth_methods.google;
  }

  static isJWTAuthMethod(check: string) {
    return check === this.#auth_methods.jwt;
  }
  static isGoogleAuthMethod(check: string) {
    return check === this.#auth_methods.google;
  }

  static makeOTP(): string {
    const arr = [];
    let start = 0;
    while (start <= 5) {
      arr.push(Math.floor(Math.random() * 10));
      start++;
    }
    return arr.join("");
  }

  static async hashUserGeneratedPW(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  static async comparePasswordToHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

export default Auth;
