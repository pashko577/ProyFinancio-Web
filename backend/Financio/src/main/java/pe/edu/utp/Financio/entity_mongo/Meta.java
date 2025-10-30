package pe.edu.utp.Financio.entity_mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;
import java.time.LocalDate;

@Document(collection = "metas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meta {
    @Id
    private String id; // ObjectId hex string
    private Integer idUsuario;
    private String nombre;
    private Double montoObjetivo;
    private Double acumulado;
    private Double porcentaje;
    private LocalDate fechaLimite;
    private Boolean activa;
}