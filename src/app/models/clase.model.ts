// src/app/models/clase.model.ts
export interface Clase {
    id: number; // ID de la clase
    nombreClase: string; // Nombre de la clase (ej. Producción Musical)
    descripcion: string; // Descripción de la clase
    profesorId: number; // ID del profesor
    fecha: string; // Fecha de la clase
    horaInicio: string; // Hora de inicio
    horaFin: string; // Hora de término
    aula: string; // Aula donde se imparte la clase
}
