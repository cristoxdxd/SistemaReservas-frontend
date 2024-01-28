export interface IHabitacion {
    id: string;
    name: string;
    description: string;
    price: number;
    capacity: number;
    image: string;
}

export const Habitacion: IHabitacion[] = [
    {
        id: '1',
        name: 'Habitación Individual',
        description: 'Habitación individual con baño privado y vistas al exterior.',
        price: 50,
        capacity: 1,
        image: '../../src/constants/images/_8714bd8f-aacf-4b86-b965-ae6f7bda7bf6.jpeg'
    },
    {
        id: '2',
        name: 'Habitación Doble',
        description: 'Habitación doble con baño privado y vistas al exterior.',
        price: 80,
        capacity: 2,
        image: '../../src/constants/images/_ca2426ac-1c99-41b2-a85c-3e025074c3bc.jpeg'
    },
    {
        id: '3',
        name: 'Habitación Triple',
        description: 'Habitación triple con baño privado y vistas al exterior.',
        price: 100,
        capacity: 3,
        image: '../../src/constants/images/_e9bb97de-dc28-41aa-b5b6-ded33d4fb3ea.jpeg'
    },
    {
        id: '4',
        name: 'Habitación Cuádruple',
        description: 'Habitación cuádruple con baño privado y vistas al exterior.',
        price: 120,
        capacity: 4,
        image: '../../src/constants/images/_4fa49748-a03c-4ac5-a7b3-4294be9a5b89.jpeg'
    },
    {
        id: '5',
        name: 'Habitación Familiar',
        description: 'Habitación familiar con baño privado y vistas al exterior.',
        price: 140,
        capacity: 5,
        image: '../../src/constants/images/_17dc1ad0-75a7-4e7e-a7ce-c878940eb1fb.jpeg'
    }
]