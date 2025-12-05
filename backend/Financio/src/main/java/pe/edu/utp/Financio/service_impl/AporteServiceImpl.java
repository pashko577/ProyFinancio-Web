package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Aporte;
import pe.edu.utp.Financio.repository.AporteRepository;
import pe.edu.utp.Financio.Service.AporteService;
import pe.edu.utp.Financio.Service.MetaService;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class AporteServiceImpl implements AporteService {

    @Autowired
    private AporteRepository aporteRepository;

    @Autowired
    private MetaService metaService; // 🔹 inyectamos MetaService

    @Override
    public Aporte registrarAporte(Aporte aporte) {
        // Asignamos fecha actual en el backend
        aporte.setFecha(LocalDateTime.now());

        // Guardamos el aporte en PostgreSQL
        Aporte guardado = aporteRepository.save(aporte);

        // Obtenemos el acumulado total de esa meta desde PostgreSQL
        BigDecimal total = aporteRepository.sumMontoByIdMeta(aporte.getIdMeta());

        // Actualizamos la meta en MongoDB con el acumulado total
        metaService.actualizarAcumuladoTotal(aporte.getIdMeta(), total.doubleValue());

        return guardado;
    }

    @Override
    public BigDecimal getAcumuladoPorMeta(String idMeta) {
        return aporteRepository.sumMontoByIdMeta(idMeta);
    }
}
