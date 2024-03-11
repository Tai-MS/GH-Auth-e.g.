import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => {
    const result = req.session.result;
    console.log("resultado",result);
    delete req.session.result;
    res.render('home', { result });
  });
  

router.get('/login', async(req, res)=>{
    res.render('login', { user: req.user })
})
export default router