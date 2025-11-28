import express, { Request, Response } from 'express';
import path from 'path'
import { fetchBooks, fetchGames } from './db';
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
        twitchChannel: process.env.EMBED_TWITCH_CHANNEL,
        embedParent: process.env.EMBED_TWITCH_PARENT
    });
});


app.get('/games', async (req: Request, res: Response) => {
  try {
        const data = await fetchGames();   
        res.render('games', {
        title: 'Games',
        data: data
    });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }   
});

app.get('/books', async (req: Request, res: Response) => {
  try {
        const data = await fetchBooks();   
        res.render('books', {
        title: 'Books',
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
