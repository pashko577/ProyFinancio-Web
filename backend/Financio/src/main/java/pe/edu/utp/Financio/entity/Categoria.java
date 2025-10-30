package pe.edu.utp.Financio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categorias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categoria {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    private String nombre;

    @Column(length = 10)
    private String tipo; // INGRESO / GASTO
}