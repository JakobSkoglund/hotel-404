import fs from 'fs';
import path from 'path';
import Hotel from '../Model/HotelModel';

interface HotelImage {
    data: Buffer;
    contentType: string;
}

interface HotelDetails {
    display: {
        title: string;
        city: string;
        description: string;
        price: string;
    };
    page: {
        title_hp: string;
        description_hp: string;
    };
}

export async function name(hotelName: string, details: HotelDetails) {

    //make imagePaths include all paths to all the hotel pictures based on hotel name
    const imagePaths = {
        hotel: path.join(__dirname, `../images/hotel_${hotelName}.png`),
        hall: path.join(__dirname, `../images/hall_${hotelName}.png`),
        room: path.join(__dirname, `../images/room_${hotelName}.png`),
        bath: path.join(__dirname, `../images/bath_${hotelName}.png`),
        food: path.join(__dirname, `../images/food_${hotelName}.png`),
        other: path.join(__dirname, `../images/other_${hotelName}.png`)
    };

    const buffers: Record<string, { data: Buffer; contentType: string } | null> = {};

    for (const [key, imagePath] of Object.entries(imagePaths)) {
        try {
            buffers[key] = {
                data: fs.readFileSync(imagePath),
                contentType: "image/png",
            };
        } catch (error: unknown) {

        }

    }




}
