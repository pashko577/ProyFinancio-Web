package pe.edu.utp.Financio.Service;

import java.math.BigDecimal;

import pe.edu.utp.Financio.entity.Aporte;

public interface AporteService {
    Aporte registrarAporte(Aporte aporte);
    BigDecimal getAcumuladoPorMeta(String idMeta);
}
