package pe.edu.utp.Financio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pe.edu.utp.Financio.entity.Pago;

public interface PagoRepository extends JpaRepository<Pago, Long> {
    Optional<Pago> findByCodigoOperacion(String codigoOperacion);
}