const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({
  databasePath:"./public/database.json"
});
const bp = require('body-parser');
app.use(bp.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.send(`<form method="POST"><input type="URL" name="url" required>
  <input type="submit">
  </form>`)
})
app.post('/', function (req, res) {
  let r = (Math.random() + 1).toString(36).substring(7);
  var b = req.body.url;
  db.set(r, b)
  res.send(`<a href="/${r}">GO!</a>`)
})
app.get('/:li', function (req, res) {
  res.redirect(db.get(req.params.li))
})
app.use('/public', express.static(path.join(__dirname, 'public')))
app.listen(port)
