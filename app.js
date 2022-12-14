var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session); // 1 파일로 저장해주기 위해 넣어주
const morganMiddleware = require('./morganMiddleware');
const nunjucks = require('nunjucks');
// const {sequelize} = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024},
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // views의 경로를 'views'로만 적어주기 위해서 뒤에 path.join 넣어서 설정해줌
app.set('view engine', 'html'); // '퍼그' 템플릿 엔진 사용
// console.log('--->', app.get('views')); // app.set() 했기 때문에 get으로 불러 올 수 있음

app.use((req, res, next) => {
      req.data = '데이터 넣기';
      // console.log('데이터 넣는곳 ->', req.data);
  next();
    }, (req, res, next) => {
      // console.log('데이터 받는곳 ->',req.data);
      next();
    }
);

nunjucks.configure('views', {
  express : app,
  watch: true,
});

// sequelize.sync({force : true }) // true로 하면 실행할때마다 db 생성
//     .then(() => {
//       console.log('데이터베이스 연결 성공');
//     })
//     .catch((err) => {
//       console.error(err);
//     })

const db = require('./models/index.js');
const sequelize = db.sequelize;
(async () => {
  await sequelize.sync({ force: false });
})()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({  // 2
  secret: 'keyboard cat',  // 암호화
  resave: false,
  saveUninitialized: true,
  store: new FileStore() // 세션을 파일로 저장
}));




app.use((req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    logger('combined')(req, res, next);
  } else {
    logger('dev')(req, res, next);
  }
});
app.use(morganMiddleware)

app.post('/upload', upload.fields([{name : 'image1'}, {name : 'image2'}]),
    (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
});


app.use('/', indexRouter); // 미들웨어 ㅇㅇ  index.js에 있는 라우터 읽음/
app.use('/users', usersRouter);  // users 경로에 대한 미들웨어


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
