// https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-Winston-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%84%9C%EB%B2%84-%EB%A1%9C%EA%B7%B8-%EA%B4%80%EB%A6%AC
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');

const { combine, timestamp, label, printf } = winston.format; //필요한 메소드와 파라미터들을 객체 변수에 구조분해로 저장해준다.

//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;

//* log 출력 포맷 정의 함수
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`; // 날짜 [시스템이름] 로그레벨 메세지
});

const logger = winston.createLogger({
    //* 로그 출력 형식 정의
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        label({ label: 'express' }), // 어플리케이션 이름
        logFormat, // log 출력 포맷
        //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
    ),
    //* 실제 로그를 어떻게 기록을 한 것인가 정의
    transports: [
        //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
        new winstonDaily({
            level: 'info', // info 레벨에선
            datePattern: 'YYYY-MM-DD', // 파일 날짜 형식
            dirname: logDir, // 파일 경로
            filename: `%DATE%.log`, // 파일 이름
            maxFiles: 30, // 최근 30일치 로그 파일을 남김
            zippedArchive: true, // 아카이브된 로그 파일을 gzip으로 압축할지 여부
        }),
        //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
        new winstonDaily({
            level: 'error', // error 레벨에선
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error', // /logs/error 하위에 저장
            filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
    //* uncaughtException 발생시 파일 설정
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

//* Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // 색깔 넣어서 출력
                winston.format.simple(), // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
            ),
        }),
    );
}

module.exports = logger;