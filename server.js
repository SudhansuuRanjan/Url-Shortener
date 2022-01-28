const express = require('express')
const mongoose = require('mongoose')
const shortId = require('shortid')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));

let copyText = ""

require('dotenv').config()

 let host = process.env.DB_HOST
 let username = process.env.DB_USER
 let password = process.env.DB_PASS

mongoose.connect('mongodb+srv://'+ username+':'+ password + host+'?retryWrites=true&w=majority');

const shortUrlSchema = {
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
}

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema )


app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls , copyText:copyText})
})

app.post('/shortUrls', (req, res) => {
  const shortUrl = new ShortUrl({
    full: req.body.fullUrl
  });
  shortUrl.save();
  res.redirect('/')
})

app.post('/copy', (req,res)=>{
  copyText = req.body.linkItem;
  console.log(copyText);
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {

  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.clicks++
  shortUrl.save()
  res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 3000);