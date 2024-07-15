import * as bcrypt from 'bcrypt';

export class HashUtils {
  static async hashString(rawString: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawString, SALT);
  }

  static async comparaString(rawString: string, hash: string) {
    return bcrypt.compareSync(rawString, hash);
  }
}
