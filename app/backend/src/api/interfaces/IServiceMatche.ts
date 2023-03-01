import Matche from '../../database/models/Matche';
import IBodyCreateMatche from './IBodyCreateMatche';
import IBodyMatche from './IBodyMatche';

export default interface IServiceMatche{
  readAll(inProgress?:boolean):Promise<Matche[] >;
  finish(id:number):Promise<number[] | undefined>;
  updateMatche(id:number, body:IBodyMatche):Promise<number[] | undefined>;
  createMatche(body:IBodyCreateMatche):Promise<Matche>;
}
