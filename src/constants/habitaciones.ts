import image1 from '../assets/8714bd8f-aacf-4b86-b965-ae6f7bda7bf6.jpg'
import image2 from '../assets/ca2426ac-1c99-41b2-a85c-3e025074c3bc.jpg'
import image3 from '../assets/e9bb97de-dc28-41aa-b5b6-ded33d4fb3ea.jpg'
import image4 from '../assets/4fa49748-a03c-4ac5-a7b3-4294be9a5b89.jpg'
import image5 from '../assets/17dc1ad0-75a7-4e7e-a7ce-c878940eb1fb.jpg'

export interface IHabitacion {
    id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    image: any;
}

export const Habitacion: IHabitacion[] = [
    {
        id: '1h',
        name: 'Habitación Individual',
        description: 'Habitación individual con baño privado y vistas al exterior.',
        price: 50,
        capacity: 1,
        image: image1
    },
    {
        id: '2h',
        name: 'Habitación Doble',
        description: 'Habitación doble con baño privado y vistas al exterior.',
        price: 80,
        capacity: 2,
        image: image2
    },
    {
        id: '3h',
        name: 'Habitación Triple',
        description: 'Habitación triple con baño privado y vistas al exterior.',
        price: 100,
        capacity: 3,
        image: image3
    },
    {
        id: '4h',
        name: 'Habitación Cuádruple',
        description: 'Habitación cuádruple con baño privado y vistas al exterior.',
        price: 120,
        capacity: 4,
        image: image4
    },
    {
        id: '5h',
        name: 'Habitación Familiar',
        description: 'Habitación familiar con baño privado y vistas al exterior.',
        price: 140,
        capacity: 5,
        image: image5
    }
]

export function getRoomDetails(id: string) {
    return Habitacion.find(habitacion => habitacion.id === id);
};