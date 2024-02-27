import { useState, useEffect } from "react";
import { auth } from "../Firebase";

const EnviarCorreo = () => {
    const [correoEnviado, setCorreoEnviado] = useState(false);
    const usuarioActual = auth.currentUser?.email;
    console.log(usuarioActual);
    const email = usuarioActual ? usuarioActual : null;

    const asunto = "Confirmación de reserva de habitación";
    const cuerpo = `Estimado/a cliente,

Le escribimos para confirmar la reserva de su habitación en nuestro hotel. 

Gracias por elegirnos. Esperamos que disfrute de su estancia con nosotros.

Atentamente,
El equipo del Hotel`;

    useEffect(() => {
        const enviarCorreo = async () => {
            try {
                if (!email) {
                    throw new Error("No hay usuario autenticado");
                }

                // Enviar solicitud al backend para enviar el correo
                const response = await fetch("/enviar-correo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, asunto, cuerpo }),
                });

                const result = await response.json();

                if (result.success) {
                    setCorreoEnviado(true);
                } else {
                    console.error("Error al enviar correo");
                }
            } catch (error) {
                console.error("Error al enviar correo:", error);
            }
        };

        enviarCorreo();
    }, [email, asunto, cuerpo]);

    return (
        <div>
            {correoEnviado && (
                <p>Correo enviado correctamente a {email}</p>
            )}
        </div>
    );
};

export default EnviarCorreo;