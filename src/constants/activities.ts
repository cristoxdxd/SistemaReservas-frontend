const images1 = '../src/assets/activity_1_1.jpg';
const images2 = 'src/assets/563df07e-fcbd-4335-8160-422ec2498d5f.jpg';
const images3 = 'src/assets/01628343-a4e4-4daa-b620-9044299349c4.jpg';
const images4 = 'src/assets/bdc08c7a-e8ac-4857-90e0-96382e1c06e5.jpg';
const images5 = 'src/assets/f6189f6e-3a65-4ca7-a853-e32b7abb9231.jpg';

export interface IActivity {
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
}

export const Activity: IActivity[] = [
    {
        name: "Snowshoeing Adventure",
        description: "Guided snowshoeing excursion through scenic winter landscapes.",
        price: 30,
        duration: 2,
        image: images1
    },

    {
        name: "Snowshoeing Adventure",
        description: "Guided snowshoeing excursion through scenic winter landscapes.",
        price: 30,
        duration: 2,
        image: images2
    },

    {
        name: "Snowshoeing Adventure",
        description: "Guided snowshoeing excursion through scenic winter landscapes.",
        price: 30,
        duration: 2,
        image: images3
    },

    {
        name: "Snowshoeing Adventure",
        description: "Guided snowshoeing excursion through scenic winter landscapes.",
        price: 30,
        duration: 2,
        image: images4
    },

    {
        name: "Snowshoeing Adventure",
        description: "Guided snowshoeing excursion through scenic winter landscapes.",
        price: 30,
        duration: 2,
        image: images5
    }
]