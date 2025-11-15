import express, { Request, Response } from 'express';
import path from 'path'
import { fetchData } from './db';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: Request, res: Response) => {
    res.render('home', {
        title: 'Home',
    });
});


app.get('/games', async (req: Request, res: Response) => {
  try {
        const data = await fetchData();   
        res.render('table', {
        title: 'Games',
        data: data
    });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }   
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
