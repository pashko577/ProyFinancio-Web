package pe.edu.utp.Financio.Service;

import pe.edu.utp.Financio.entity_mongo.Meta;
import java.util.List;

public interface MetaService {
    Meta registrar(Meta meta);
    List<Meta> listarActivasPorUsuario(int idUsuario);
    Meta actualizarAcumulado(String idMeta, double monto);
    void desactivarSiCumplida(String idMeta);
}