package pe.edu.utp.Financio.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import pe.edu.utp.Financio.model.Movimiento;
import pe.edu.utp.Financio.repository.MovimientoRepository;

@Service
public class MovimientoService {
    private final MovimientoRepository repo;

    public MovimientoService(MovimientoRepository repo) {
        this.repo = repo;
    }

    public List<Movimiento> listarPorUsuario(int idUsuario) {
        return repo.findByUsuarioId(idUsuario);
    }

    public Movimiento guardar(Movimiento movimiento) {
        return repo.save(movimiento);
    }

    public void eliminar(int id) {
        repo.deleteById(id);
    }
}
