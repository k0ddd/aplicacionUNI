// src/app/models/historial.model.ts
export interface Historial {
    id: number; // ID del registro en el historial
    claseId: number; // ID de la clase
    fecha: string; // Fecha de la clase
    horaInicio: string; // Hora de inicio
    horaFin: string; // Hora de término
}
