import { bookings} from "../MocData/bookings";
import { IBooking } from "../Model/Booking";

function GetBookings(): IBooking[] {
    //Kommer göra en API request sen men returnerar statisk data just nu
    return bookings; 
}