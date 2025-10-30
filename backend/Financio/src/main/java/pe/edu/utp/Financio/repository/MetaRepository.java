package pe.edu.utp.Financio.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pe.edu.utp.Financio.entity_mongo.Meta;
import java.util.List;

@Repository
public interface MetaRepository extends MongoRepository<Meta, String> {
    List<Meta> findByIdUsuarioAndActivaTrue(int idUsuario);
}