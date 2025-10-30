package pe.edu.utp.Financio.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "metodopago")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Metodopago {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    private String tipo;
}