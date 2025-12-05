package pe.edu.utp.Financio.service_impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.Financio.entity_mongo.Meta;
import pe.edu.utp.Financio.repository.MetaRepository;
import pe.edu.utp.Financio.Service.MetaService;

import java.util.List;

@Service
public class MetaServiceImpl implements MetaService {

    @Autowired
    private MetaRepository metaRepository;

    @Override
    public Meta registrar(Meta meta) {
        meta.setActiva(true);
        meta.setAcumulado(0.0);

        // Solo pon 0 si viene null
        if (meta.getPorcentaje() == null) {
            meta.setPorcentaje(0.0);
        }

        return metaRepository.save(meta);
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
