package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Recordatorio;
import pe.edu.utp.Financio.entity_mongo.Meta;
import pe.edu.utp.Financio.repository.RecordatorioRepository;
import pe.edu.utp.Financio.repository.MetaRepository;
import pe.edu.utp.Financio.Service.RecordatorioService;

import java.time.LocalDate;
import java.util.List;

@Service
public class RecordatorioServiceImpl implements RecordatorioService {

    @Autowired
    private RecordatorioRepository recordatorioRepository;

    @Autowired
    private MetaRepository metaRepository; // 🔹 inyectar repositorio de metas

    @Override
    public Recordatorio crearRecordatorio(Recordatorio recordatorio) {
        recordatorio.setEnviado(false); // seguridad
        return recordatorioRepository.save(recordatorio);
    }

    @Override
    public List<Recordatorio> obtenerRecordatoriosPendientes(Integer idUsuario) {
        LocalDate hoy = LocalDate.now();
        List<Recordatorio> recordatorios = recordatorioRepository
                .findByIdUsuarioAndFechaRecordatorioLessThanEqualAndEnviadoFalse(idUsuario, hoy);

        // 🔹 Actualizar mensaje con días restantes
        for (Recordatorio r : recordatorios) {
            if (r.getIdMeta() != null) {
                Meta meta = metaRepository.findById(r.getIdMeta()).orElse(null);
                if (meta != null && meta.getFechaLimite() != null) {
                    long diasFaltantes = java.time.temporal.ChronoUnit.DAYS.between(hoy, meta.getFechaLimite());
                    r.setMensaje("⏰ Recuerda tu meta: " + meta.getNombreMeta()
                            + ". Faltan " + (diasFaltantes >= 0 ? diasFaltantes : 0) + " días.");
                }
            }
        }

        return recordatorios;
    }

    @Override
    public void marcarComoEnviado(Long id) {
        Recordatorio r = recordatorioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recordatorio no encontrado: " + id));
        r.setEnviado(true);
        recordatorioRepository.save(r);
    }
}
