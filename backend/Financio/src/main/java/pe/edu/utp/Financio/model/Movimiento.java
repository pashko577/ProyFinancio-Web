package pe.edu.utp.Financio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movimientos")
public class Movimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_metodo_pago")
    private Metodopago metodoPago;

    private BigDecimal monto;
    private String descripcion;
    private Timestamp fecha;
    private String tipo;

    @Column(name = "nombre_metodo_pago")
    private String nombreMetodoPago;

    private int creadoPor;
    private String nombreCreador;
}
