const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

async function initialize(passport, fetchUserByEmail, getUserById) {
    const authenticator = async (req, email, password, done) => {
        const userbyEmail = await fetchUserByEmail(email);
        if (!userbyEmail.length) {
            return done(null, false, req.flash("errorMessage", "The email you entered did not match any of our records. Please double-check and try again."));
        } else {
            const user = userbyEmail[0];
            try {
                console.log(user)
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, req.flash("errorMessage", "The password you entered did not matching to the email. Please double-check and try again."));
                }
            } catch (err) {
                return done(err);
            }
        }
    }
    passport.use(new localStrategy({ usernameField: 'email', passReqToCallback: true }, authenticator));

    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })
}


module.exports = initialize;