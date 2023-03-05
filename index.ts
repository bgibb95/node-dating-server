import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
// Import order is important. Do not adjust
// prettier-ignore
dotenv.config();
// prettier-ignore
// prettier-ignore
import { authRoutes } from './routes/auth.routes';
// prettier-ignore
import { userRoutes } from './routes/user.routes';

const app: Express = express();
const port = process.env.PORT || 8080;
const corsConfig: CorsOptions = { origin: process.env.ALLOWED_ORIGIN };

app.use(cors(corsConfig));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Uncomment to reset and seed database with dummy data for testing
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drops and Resync Database with { force: true }');
//   seedDb(db.user);
// });

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

// Routes
authRoutes(app);
userRoutes(app);

app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
