package pe.edu.utp.Financio.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class PagoRequestDTO {
    private Long idUsuario;
    private Long idSuscripcion;
    private BigDecimal monto;
    private String codigoOperacion;
    private String imagenComprobante;
}
