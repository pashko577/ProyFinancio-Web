package pe.edu.utp.Financio.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pe.edu.utp.Financio.entity_mongo.Meta;
import java.util.List;

public interface MetaRepository extends MongoRepository<Meta, String> {
    List<Meta> findByIdUsuarioAndActivaTrue(Integer idUsuario);
}
