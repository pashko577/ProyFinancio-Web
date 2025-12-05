package pe.edu.utp.Financio.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.Id;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_suscripcion", nullable = false)
    private Suscripcion suscripcion;

    private BigDecimal monto;

    @Column(unique = true)
    private String codigoOperacion;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String imagenComprobante;

    private String estado = "PENDIENTE";

    private LocalDateTime fechaPago = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        this.fechaPago = LocalDateTime.now();
        this.estado = "PENDIENTE";
    }
}