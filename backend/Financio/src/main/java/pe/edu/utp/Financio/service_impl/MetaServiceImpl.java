package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity.Recordatorio;
import pe.edu.utp.Financio.entity_mongo.Meta;
import pe.edu.utp.Financio.repository.MetaRepository;
import pe.edu.utp.Financio.Service.MetaService;
import pe.edu.utp.Financio.Service.RecordatorioService;

import java.time.LocalDate;
import java.util.List;

@Service
public class MetaServiceImpl implements MetaService {

    @Autowired
    private MetaRepository metaRepository;

    @Autowired
    private RecordatorioService recordatorioService;

    @Override
    public Meta registrar(Meta meta) {
        meta.setActiva(true);
        meta.setAcumulado(0.0);

        if (meta.getPorcentaje() == null) {
            meta.setPorcentaje(0.0);
        }

        // Guardar la meta primero
        Meta creada = metaRepository.save(meta);

        // 🔹 Crear recordatorio automático si hay fecha límite
        if (creada.getFechaLimite() != null) {
            LocalDate hoy = LocalDate.now();
            long diasFaltantes = java.time.temporal.ChronoUnit.DAYS.between(hoy, creada.getFechaLimite());

            // La fecha del recordatorio será 3 días antes de la fecha límite o hoy si ya
            // pasó
            LocalDate recordatorioFecha = creada.getFechaLimite().minusDays(3);
            if (recordatorioFecha.isBefore(hoy)) {
                recordatorioFecha = hoy;
            }

            String mensaje = "⏰ Recuerda tu meta: " + creada.getNombreMeta()
                    + ". Faltan " + diasFaltantes + " días para tu fecha límite.";

            Recordatorio r = Recordatorio.builder()
                    .idMeta(creada.getId())
                    .idUsuario(creada.getIdUsuario())
                    .mensaje(mensaje)
                    .fechaRecordatorio(recordatorioFecha)
                    .enviado(false)
                    .build();

            recordatorioService.crearRecordatorio(r);
        }

        return creada;
    }

    @Override
    public List<Meta> listarActivasPorUsuario(int idUsuario) {
        return metaRepository.findByIdUsuarioAndActivaTrue(idUsuario);
    }

    @Override
    public Meta actualizarAcumulado(String idMeta, double monto) {
        Meta meta = metaRepository.findById(idMeta)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada: " + idMeta));

        double nuevoAcumulado = meta.getAcumulado() + monto;
        double porcentaje = (nuevoAcumulado / meta.getMontoObjetivo()) * 100;

        meta.setAcumulado(nuevoAcumulado);
        meta.setPorcentaje(Math.min(porcentaje, 100.0));

        if (nuevoAcumulado >= meta.getMontoObjetivo()) {
            meta.setActiva(false);
        }

        return metaRepository.save(meta);
    }

    @Override
    public Meta actualizarAcumuladoTotal(String idMeta, double total) {
        Meta meta = metaRepository.findById(idMeta)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada: " + idMeta));

        meta.setAcumulado(total);
        meta.setPorcentaje(Math.min((total / meta.getMontoObjetivo()) * 100, 100.0));

        if (total >= meta.getMontoObjetivo())
            meta.setActiva(false);

        return metaRepository.save(meta);
    }

    @Override
    public void desactivarSiCumplida(String idMeta) {
        Meta meta = metaRepository.findById(idMeta)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada"));

        if (meta.getAcumulado() >= meta.getMontoObjetivo()) {
            meta.setActiva(false);
            metaRepository.save(meta);
        }
    }

    @Override
    public void eliminar(String idMeta) {
        metaRepository.deleteById(idMeta);
    }
}
