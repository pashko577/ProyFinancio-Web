package pe.edu.utp.Financio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "cajas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Caja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCaja;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    private String nombre;

    @Column(precision = 15, scale = 2)
    private BigDecimal fondo;

    @Column(precision = 15, scale = 2)
    private BigDecimal cierre;

    private LocalDate fechaApertura;
    private LocalDate fechaCierre;
}
