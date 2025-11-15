import express, { Request, Response } from 'express';
import path from 'path'

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Home',
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
