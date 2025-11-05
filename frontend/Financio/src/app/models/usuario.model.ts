export interface Usuario {
  id?: number;                 // opcional, generado por el backend
  nombre: string;
  dni: string;
  correo: string;
  telefono?: string;
  contrasena: string;      // coincide con el nombre exacto del campo JSON
  rol?: string;
  fechaRegistro?: string; 
}
