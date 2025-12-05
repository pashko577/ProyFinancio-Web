package pe.edu.utp.Financio.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "recordatorios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recordatorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String idMeta; // referencia a la meta en MongoDB
    private Integer idUsuario;
    private String mensaje;
    private LocalDate fechaRecordatorio;
    private Boolean enviado = false;
    private LocalDateTime creado = LocalDateTime.now();
}