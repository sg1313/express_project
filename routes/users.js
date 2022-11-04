var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('cookies', req.cookies); // index.js에서 만들어진 쿠키가 여기에도 있는지 확인
  // login(req.cookies); // id, pw를 갖고와서 로그인하기


  res.send('respond with a resource');
});

module.exports = router;
