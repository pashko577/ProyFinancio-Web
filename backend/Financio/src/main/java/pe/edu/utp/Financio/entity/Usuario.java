package pe.edu.utp.Financio.entity;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios", indexes = @Index(columnList = "correo"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    @Column(length = 12)
    private String dni;

    @Column(nullable = false, unique = true)
    private String correo;

    private String telefono;

    @Column(name = "contrasena_hash", nullable = false)
    private String contrasenaHash;

    private String rol;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @PrePersist
    public void prePersist() { this.fechaRegistro = LocalDateTime.now(); }
}