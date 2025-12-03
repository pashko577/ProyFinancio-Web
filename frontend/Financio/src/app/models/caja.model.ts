export interface CajaModel {
  idCaja: number;
  usuario: {
    idUsuario: number;
    nombre: string;
  };
  fondo: number;
  cierre: number;
  fechaApertura: string;
  fechaCierre: string;
}

