import crypto from "crypto";
import { CRYPTO_ALGO,SECRET_RANDOM_KEY } from "../config/server.config";
const algorithm = CRYPTO_ALGO|| 'aes-256-cbc'


export function encrypt(text:string)
{ if(!SECRET_RANDOM_KEY)
{
    throw new Error('Random Secret key not provided for encryption');
}
    const iv=crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(SECRET_RANDOM_KEY, 'hex'), iv);
let encrypted=cipher.update(text,'utf8','hex');
encrypted +=cipher.final ('hex');
return {
    iv:iv.toString('hex'),
    encryptedData:encrypted

};
}
export function decrypt(encryptedText:string,iv:string)
{  if(!SECRET_RANDOM_KEY)
    {
        throw new Error('Random Secret key not provided for encryption');
    }
    const decipher = crypto.createDecipheriv(algorithm,Buffer.from(SECRET_RANDOM_KEY, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}