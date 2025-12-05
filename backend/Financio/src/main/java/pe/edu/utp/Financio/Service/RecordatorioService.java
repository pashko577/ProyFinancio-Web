package pe.edu.utp.Financio.Service;

import pe.edu.utp.Financio.entity.Recordatorio;
import java.util.List;

public interface RecordatorioService {
    Recordatorio crearRecordatorio(Recordatorio recordatorio);

    // Devuelve recordatorios pendientes hasta la fecha actual
    List<Recordatorio> obtenerRecordatoriosPendientes(Integer idUsuario);

    // Marca un recordatorio como enviado
    void marcarComoEnviado(Long id);
}
