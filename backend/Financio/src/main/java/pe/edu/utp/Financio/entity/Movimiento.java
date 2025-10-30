package pe.edu.utp.Financio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimientos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movimiento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // en tu diseño original id_usuario era el admin/propietario
    @ManyToOne @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne @JoinColumn(name = "id_metodopago")
    private Metodopago metodoPago;

    @Column(precision = 15, scale = 2)
    private BigDecimal monto;

    private String descripcion;

    private LocalDateTime fecha;

    private String tipo; // INGRESO / GASTO

    @ManyToOne @JoinColumn(name = "creado_por")
    private Usuario creadoPor;
}