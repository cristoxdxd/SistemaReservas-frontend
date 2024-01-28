export interface ICabania {
    id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    image: string;
}

export const Cabania: ICabania[] = [
    {
        id: "1",
        name: "Cabaña de Montaña",
        description: "Una acogedora cabaña en medio de las montañas",
        price: 30,
        capacity: 8,
        image: "src/constants/images/_3e89d9a4-feed-42ed-878a-b1085b92e1fc.jpeg"
    },
    {
        id: "2",
        name: "Cabaña junto al Lago",
        description: "Una hermosa cabaña con vista al lago",
        price: 40,
        capacity: 6,
        image: "src/constants/images/_563df07e-fcbd-4335-8160-422ec2498d5f.jpeg"
    },
    {
        id: "3",
        name: "Cabaña en el Bosque",
        description: "Una encantadora cabaña rodeada de árboles",
        price: 60,
        capacity: 5,
        image: "src/constants/images/_01628343-a4e4-4daa-b620-9044299349c4.jpeg"
    },
    {
        id: "4",
        name: "Cabaña en la Playa",
        description: "Una relajante cabaña cerca del mar",
        price: 50,
        capacity: 5,
        image: "src/constants/images/_bdc08c7a-e8ac-4857-90e0-96382e1c06e5.jpeg"
    },
    {
        id: "5",
        name: "Cabaña en la Ciudad",
        description: "Una moderna cabaña en el corazón de la ciudad",
        price: 40,
        capacity: 7,
        image: "src/constants/images/_f6189f6e-3a65-4ca7-a853-e32b7abb9231.jpeg"
    }
]