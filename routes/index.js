var express = require('express');
var router = express.Router();
const logger = require("../logger");

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('Cookies: ', req.cookies) //사용자가 요청한 쿠키가 있는지 확인

  logger.info(req.session); // 콘솔창에 info: [object Object] 확인, logs 폴더 생성&로그파일 생성 확인!!
  // console.log("ddddddddddd", req.session);
  if(!req.session.num){
    req.session.num = 1;
  } else {
    req.session.num = req.session.num + 1;
  }

  req.session.is_logined = true; // sessions 파일에 저장됨
  req.session.nickname = 'gildong';  // sessions 파일에 저장됨

  req.session.save(err => {
    if (err) throw err;
    // res.redirect(302, '/users');
  });

  // 쿠키 생성하기
  res.cookie('hasVisited', '1', {
    maxAge: 60*60*1000,
    httpOnly: true,
    path: '/'
  });

  // res.clearCookie('hasVisited', {path: '/'}) // 쿠키 지우기, 쿠키 이름& 옵션(path)
  res.render('index', { title: "dddddddd" }); // title 값은 index.pug에 있는 #{title}로 전달
});

module.exports = router;
