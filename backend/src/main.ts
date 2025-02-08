import express from 'express';
import cors from "cors";
// import session from 'express-session';
import routes from './routes/routes';

const port = 8080;
export const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true}));
//I think I'll do without session and just use DB. Each server can be a user.
// app.use(session({
//     secret: '2334860559',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production',
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     }
// }));

app.use(routes);

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ status: 'API is running on /api' });
});

app.listen(port, () => {
    console.info(`server up on port ${port}`);
});
