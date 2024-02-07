import images1 from '../assets/3e89d9a4-feed-42ed-878a-b1085b92e1fc.jpg';
import images2 from '../assets/563df07e-fcbd-4335-8160-422ec2498d5f.jpg';
import images3 from '../assets/01628343-a4e4-4daa-b620-9044299349c4.jpg';
import images4 from '../assets/bdc08c7a-e8ac-4857-90e0-96382e1c06e5.jpg';
import images5 from '../assets/f6189f6e-3a65-4ca7-a853-e32b7abb9231.jpg';

export interface ICabania {
    id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    image: any;
}

export const Cabania: ICabania[] = [
    {
        id: "1c",
        name: "Cabaña de Montaña",
        description: "Una acogedora cabaña en medio de las montañas",
        price: 30,
        capacity: 8,
        image: images1
    },
    {
        id: "2c",
        name: "Cabaña junto al Lago",
        description: "Una hermosa cabaña con vista al lago",
        price: 40,
        capacity: 6,
        image: images2
    },
    {
        id: "3c",
        name: "Cabaña en el Bosque",
        description: "Una encantadora cabaña rodeada de árboles",
        price: 60,
        capacity: 5,
        image: images3
    },
    {
        id: "4c",
        name: "Cabaña en la Playa",
        description: "Una relajante cabaña cerca del mar",
        price: 50,
        capacity: 5,
        image: images4
    },
    {
        id: "5c",
        name: "Cabaña en la Ciudad",
        description: "Una moderna cabaña en el corazón de la ciudad",
        price: 40,
        capacity: 7,
        image: images5
    }
]

export function getCabinDetails(id: string) {
    return Cabania.find(cabania => cabania.id === id);
};