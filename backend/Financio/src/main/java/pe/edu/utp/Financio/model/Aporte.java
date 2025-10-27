package pe.edu.utp.Financio.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "aportes")
@Getter
@Setter
@NoArgsConstructor
public class Aporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAporte;

    @ManyToOne
    @JoinColumn(name = "id_meta")
    private Meta meta;

    private double monto;
    private LocalDateTime fecha;
}
