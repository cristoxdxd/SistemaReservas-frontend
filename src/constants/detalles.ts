export interface IReserva {
    nombreApellido: string;
    correoElectronico: string;
    tipoHabitacion: string;
    fechaCheckIn: Date;
    fechaCheckOut: Date;
    numAdultos: number;
    numNinos: number;
    serviciosAdicionales: string[];
    costoTotal: number;
}

export const Reserva: IReserva[] = [
    {
        nombreApellido: "Juan Pérez",
        correoElectronico: "juan@example.com",
        tipoHabitacion: "Doble",
        fechaCheckIn: new Date("2024-02-01"),
        fechaCheckOut: new Date("2024-02-05"),
        numAdultos: 2,
        numNinos: 1,
        serviciosAdicionales: ["Desayuno", "Wi-Fi"],
        costoTotal: 500,
    }
];
