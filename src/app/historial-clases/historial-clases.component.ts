import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-clases',
  templateUrl: './historial-clases.component.html',
  styleUrls: ['./historial-clases.component.scss'],
})
export class HistorialClasesComponent  implements OnInit {
  cards: { id: string; titulo: string; fecha: string; hora: string }[] = [];
  constructor() { }

  actualizarFechaHora(card: any) {
    const now = new Date();
    card.fecha = now.toLocaleDateString(); // Formato de fecha
    card.hora = now.toLocaleTimeString(); // Formato de hora
  }

  ngOnInit() {
    // Inicializa las tarjetas con valores vacíos
    this.cards = [
      { id: 'first', titulo: 'Ramo_1', fecha: '', hora: '' },
      { id: 'second', titulo: 'Ramo_2', fecha: '', hora: '' },
      { id: 'third', titulo: 'Ramo_3', fecha: '', hora: '' },
    ];


  }
}