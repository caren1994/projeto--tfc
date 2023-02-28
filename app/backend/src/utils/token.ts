import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IPayload from '../api/interfaces/IPayload';

dotenv.config();

export function tokenGenerate(payload:IPayload):string {
  return sign(payload, process.env.JWT_SECRET as string);
}

export function decodeToken(token:string) {
  return verify(token, process.env.JWT_SECRET as string);
}
