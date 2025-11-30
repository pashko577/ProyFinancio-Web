package pe.edu.utp.Financio.entity;

import lombok.Data;

@Data
public class SuscripcionRequest {

    private Integer idPlan;
    private Integer idUsuario; // Puede ser null si es un cliente externo

    private String nombreCliente;
    private String correo;
    private String telefono;
}
