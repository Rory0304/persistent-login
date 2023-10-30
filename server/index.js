const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fileStore = require("session-file-store")(session); // session file store

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "GET"],
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

app.use(cookieParser("secret"));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 24 * 6 * 60 * 10000,
      httpOnly: false,
      secure: false, // test for localhost
    },
    name: "session-cookie",
    store: new fileStore(),
  })
);

app.get("/autoLogin", (req, res, next) => {
  // 세션 ID가 포함이 되어 있는지 확인
  if (req.session.user) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});

app.post("/login", (req, res) => {
  const id = req.body.id;

  // 로그인 로직 수행 후 사용자 정보를 세션에 저장
  // 만약 세션이 없다면, 세션 등록
  if (typeof req.session.user === "undefined") {
    req.session.user = id;
  }

    req.session.save(function () {
      res.status(200).send(`Login Success`);
    });
});

app.get("/logout", (req, res) => {
  // 세션 데이터 삭제 (로그아웃 처리)
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      // 클라이언트의 브라우저에서 세션 쿠키 삭제
      res.send("Logged out successfully!");
    }
  });
});

app.listen(8000, () => console.log("Backend Running on Port 8000"));
