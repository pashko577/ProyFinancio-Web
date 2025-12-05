package pe.edu.utp.Financio.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pe.edu.utp.Financio.entity.Usuario;
import pe.edu.utp.Financio.repository.UsuarioRepository;

@Component
public class SuscripcionInterceptor implements HandlerInterceptor {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        // Obtenemos el id del usuario de los headers (o token JWT)
        String idUsuarioHeader = request.getHeader("X-USER-ID"); 
        if (idUsuarioHeader == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"mensaje\":\"Usuario no autenticado\"}");
            return false;
        }

        Long idUsuario = Long.parseLong(idUsuarioHeader);
        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);

        if (usuario == null || !Boolean.TRUE.equals(usuario.getSuscripcionActiva())) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"mensaje\":\"Debes adquirir un plan para acceder a este módulo\"}");
            return false;
        }

        // Usuario con suscripción activa, permite continuar
        return true;
    }
}