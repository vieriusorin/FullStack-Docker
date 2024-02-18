import prisma from "../db";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;



passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});
		done(null, user);
	} catch (error) {
		console.log(error);
		done(error, null);
	}
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
