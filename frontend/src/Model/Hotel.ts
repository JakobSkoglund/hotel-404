export interface IHotel {
    id: string;
    price: string;
    image: string;
    description: string;
    title:string;
    city:string;
    key:string;

    //lägg til mer om du vill
}

export interface IHotelDetails {
  page: {
    title: string, 
    description: string
  }, 
  hotel_img: string, 
  hall_img: string, 
  room_img: string, 
  bath_img: string, 
  food_img: string, 
  other_img: string
}
