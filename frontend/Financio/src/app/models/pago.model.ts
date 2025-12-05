export interface Pago {
  id?: number;
  idUsuario: number;
  idSuscripcion: number;
  monto: number;
  codigoOperacion: string;
  imagenComprobante?: string;
  estado?: string;
}
0