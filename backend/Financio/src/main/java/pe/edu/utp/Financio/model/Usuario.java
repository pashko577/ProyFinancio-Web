package pe.edu.utp.Financio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;



@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nombre;
    private String dni;
    private String correo;
    private String telefono;
    private String contrasenaHash;
    private String rol;

    @Column(name = "fecha_registro")
    private Timestamp fechaRegistro;

    // Getters y setters (o usa Lombok @Getter/@Setter)

}
