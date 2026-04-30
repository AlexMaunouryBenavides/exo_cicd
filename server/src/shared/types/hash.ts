import * as argon2 from "argon2";

export async function hashPassord(password: string): Promise<string> {
  return await argon2.hash(password);
}
export async function verifypassword(digest: string, password: string) {
  return await argon2.verify(digest, password);
}
