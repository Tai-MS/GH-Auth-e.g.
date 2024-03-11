import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req, res) => {
    // No necesitas hacer nada aquí si solo quieres redirigir al usuario a la página de autenticación de GitHub
  });

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Guarda el resultado en req.session para que puedas acceder a él después de redirigir
    req.session.result = req.user;
    res.redirect('/');
  });

export default router;
