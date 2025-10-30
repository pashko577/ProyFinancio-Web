package pe.edu.utp.Financio.entity_mongo;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Document(collection = "aportes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Aporte {
    @Id
    private String id;
    private String idMeta; // referencia a Meta.id (hex)
    private BigDecimal monto;
    private LocalDateTime fecha;
}