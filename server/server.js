import express from 'express';
import path from 'path';
import rewrite from 'express-urlrewrite';

const app = express();

app.use('/static', express.static(path.join(__dirname, '../dist')));

app.use((req, res, next) => {
  if (req.url === '/') {
    res.redirect('/zh/index');
  } else {
    next();
  }
});

app.use(require('./runtimeSSRMiddle'));

app.use((req, res) => {
  res.status(404);
  res.send('not found');
});

app.use((error, req, res) => {
  res.status(500);
  res.render('error', { error });
});

const server = app.listen(9090, () => {
  const { port } = server.address();
  console.info(`Listened at http://localhost:${port}`);
});
