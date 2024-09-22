import {IHotel} from "../Model/Hotel";
import { hotels } from "../MocData/hotelCards"; 

export function getHotelInfo(): IHotel[]{
  return hotels; 
}
