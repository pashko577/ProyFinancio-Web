package pe.edu.utp.Financio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "suscripciones")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Suscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_plan", nullable = false)
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario; // Puede ser null

    @Column(name = "nombre_cliente", nullable = false)
    private String nombreCliente;

    @Column(nullable = false)
    private String correo;

    private String telefono;

    @Column(name = "fecha_suscripcion")
    private LocalDateTime fechaSuscripcion;

    @Column(nullable = false)
    private String estado = "PENDIENTE";

    @PrePersist
    public void prePersist() {
        this.fechaSuscripcion = LocalDateTime.now();
        this.estado = "PENDIENTE";
    }
}
