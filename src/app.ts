import express from 'express';

// código Willianson Dantas

import ErrorHandler from './Middlewares/ErrorHandler';
import routes from './Routes/Routes';

// código Willianson Dantas

const app = express();

// código Willianson Dantas

app.use(express.json());
app.use(routes);
app.use(ErrorHandler.handle);

// código Willianson Dantas

export default app;
