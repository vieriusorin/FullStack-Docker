import prisma from "../db";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

export const passportGoogle = () => {

	return (() => {
		// Serialize and deserialize user data for session management
		passport.serializeUser((user, done) => {
			done(null, user.id);
		});

		passport.deserializeUser((id, done) => {
			prisma.user.findUnique({
				where: { googleId: id },
			})
				.then(user => done(null, user))
				.catch(error => done(error, null));
		});

		passport.use(
			new GoogleStrategy(
				{
					clientID: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
					callbackURL: "/auth/google/callback",
				},
				async function (accessToken, refreshToken, profile, done) {
					try {
						const existingUser = await prisma.user.findUnique({
							where: {
								googleId: profile.id,
							}
						})
						if (existingUser) {
							return done(null, existingUser)
						} else {
							const newUser = await prisma.user.create({
								data: {
									googleId: profile.id,
									email: profile.emails[0].value,
									name: profile.displayName,
									username: profile.username
								}
							});
							return done(null, newUser)
						}
					} catch (error) {
						console.error('Error authenticating with Google:', error);
						done(error, null);
					} finally {
						await prisma.$disconnect();
					}
				}
			)
		);



	})()
};

