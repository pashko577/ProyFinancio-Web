package pe.edu.utp.Financio.dto;

import lombok.Data;

@Data
public class SuscripcionRequest {
    private Integer idPlan;
    private String nombreCliente;
    private String correo;
    private String telefono;
}
