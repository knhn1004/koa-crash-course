const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

// replace with DB
const things = ['My Family', 'Programming', 'Music']

// json prettier middleware
app.use(json())

// body parser middleware
app.use(bodyParser())

// add additional properties to context
app.context.user = 'Oliver'

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
})

// routes
router.get('/', index)
router.get('/add', showAdd)
router.post('/add', add)

// list of things
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I Love',
    things,
  })
}

// show add page
async function showAdd(ctx) {
  await ctx.render('add')
}

// add thing
async function add(ctx) {
  const body = ctx.request.body
  things.push(body.thing)
  ctx.redirect('/')
}

// simple middleware example
// app.use(async ctx => (ctx.body = { msg: 'hello wolrd' }))

router.get('/test', ctx => (ctx.body = `hello ${ctx.user}`))
router.get('/test2/:name', ctx => (ctx.body = `hello ${ctx.params.name}`))

// router middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
  console.log('Server started')
})
