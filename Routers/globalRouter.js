import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    logout,
    githubLogin,
    postGithubLogin,
    getMe,
    facebookLogin,
    postFacebookLogin
} from "../controllers/userController";
import { olnyPublic, olnyPrivate } from "../middlewares";

const globalRouter = express.Router();
globalRouter.get(routes.join, olnyPublic, getJoin);
globalRouter.post(routes.join, olnyPublic, postJoin, postLogin);

globalRouter.get(routes.login, olnyPublic, getLogin);
globalRouter.post(routes.login, olnyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, olnyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", {
        failureRedirect: routes.login
    }),
    postGithubLogin
);
globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
    routes.facebookCallback,
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    postFacebookLogin
);

export default globalRouter;
