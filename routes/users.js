var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res, next)=> {
      console.log('cookies', req.cookies);
      console.log('body', req.body);
        console.log('ip', req.ip);
        console.log('app', req.app);


        res.send('<h1>respond with a get</h1> resource')}
    )
    .post((req, res, next) => {
      console.log('parameter :');
      res.send('<h1>respond with a post</h1> resource' + req.params.id + req.query.limit)}
      ); //postman에서 post 방식으로 send 하기


// 아래에 따로 되어있던거를 하나로 묶음 (루트가 서로 같을 때 위처럼 가능)
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log('cookies', req.cookies); // index.js에서 만들어진 쿠키가 여기에도 있는지 확인
//   // login(req.cookies); // id, pw를 갖고와서 로그인하기
//
//   res.send('<h1>respond with a</h1> resource');
// });
//
// router.post('/', function(req, res, next) {
//   console.log('parameter :');
//   res.send('<h1>respond with a</h1> resource' + req.params.id + req.query.limit);
//   // http://localhost:4000/users/123?query='감자'&limit='10'
// });


router.get('/example', (req, res) => {
    res.render('example', {text : '동해물과백두산이',
        text2 : '마르고 닳도록',
        text3 : '하나님이 보우하사 우리나라만세',
        text4 : ['사과', '바나나', '복숭아']})
});
// 경로 : users/example

module.exports = router;
