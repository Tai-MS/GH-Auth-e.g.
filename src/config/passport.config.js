import passport from "passport";
import GitHubStrategy from 'passport-github2'
import userService from '../models/User.js'

const initializePassport = () => {
    passport.serializeUser((user, done)=>{
        // console.log("Serilize: ",user);
        done(null, user)
    })
    passport.deserializeUser(async (id, done) => {
        try {
            console.log('Deserialize: ', user._id);

            const user = await userService.findById(id);
            if (!user) {
            console.log('Deserialize: ', user._id);

                return done(new Error('User not found'));
            }
            console.log('Deserialize: ', user._id);
            done(null, user._id);
        } catch (error) {
            done(error);
        }
    });
    
    passport.use('github', new GitHubStrategy({
        clientID: "",
        clientSecret: "", 
        callbackURL: "http://localhost:8080/api/sessions/auth/github/callback"
    }, async(accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        try {
            console.log("Conseguido");
            let user = await userService.findOne({first_name: profile._json.login})
            if(!user){
                let newUser = {
                    first_name: profile._json.login
                }
                let result = await userService.create(newUser)
                done(null, result)
            }else{
                done(null, profile._json.login)
            }
            // console.log(profile._json.login);
        } catch (error) {
            console.log(accessToken);
            return done(error)
        }
    }))
}

export default initializePassport

