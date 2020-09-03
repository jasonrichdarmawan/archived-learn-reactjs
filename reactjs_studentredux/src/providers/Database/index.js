import React, { useState } from "react";

export const DatabaseContext = React.createContext();

export const DatabaseProvider = ({ children }) => {
  // question: why popping out component "DashboardPage" cause the { database } value to [] ?
  const [database, setDatabase] = useState([
    {
      uid: 0,
      type: 0,
      username: "jason",
      password: "0",
      profileUrl:
        "https://media-exp1.licdn.com/dms/image/C5103AQEHNSw5h-XKyQ/profile-displayphoto-shrink_400_400/0?e=1604534400&v=beta&t=q3mdmY5CS8fDIiY3eofXj1bAfJfpHROXfy_j_qAIqwo",
      displayName: "Jason Rich Darmawan Onggo Putra",
      quotes:
        "1. Focus on testing the MVP, everything else can wait. 2. Learn from the mistakes.",
      githubUrl: "https://github.com/kidfrom",
    },
    // TODO
    {
      uid: 1,
      type: 1,
      username: "fawwaazrahman",
      password: "1",
      profileUrl:
        "https://bc3-production-assets-cdn.basecamp-static.com/3969846/people/30316027/avatars/avatar-0114179c9e592fa2088f97feceec41e6-128-x1",
      displayName: "Fawwaazrahman Arandhana W",
      quotes:
        "Beraki-rakit dahulu berakit-rakit kemudian, bersakit-sakit dahulu bersakit-sakit kemudian.",
      githubUrl: "https://github.com/fwzfwz",
    },
    // TODO
    {
      uid: 2,
      type: 1,
      username: "jenedy",
      password: "2",
      displayName: "Jenedy Hidayat",
    },
    // TODO
    {
      uid: 3,
      type: 1,
      username: "taufik",
      password: "3",
      profileUrl: "",
      displayName: "Taufik Muharrom",
      quotes: "Your future is created by what you to do today, not tommorow",
      githubUrl: "https://github.com/taufik-muharrom",
    },
    {
      uid: 4,
      type: 1,
      username: "aisah",
      password: "4",
      profileUrl:
        "https://avatars0.githubusercontent.com/u/57663851?s=460&u=7bd2cabb95e920ea9cc3bea599b9f9baff618e9f&v=4",
      displayName: "Aisah Taufik Hidayat Abdullah",
      quotes: "Do good and good will come to you",
      githubUrl: "https://github.com/athaisyah",
    },
    {
      uid: 5,
      type: 1,
      username: "fauzan",
      password: "5",
      profileUrl:
        "https://i.ibb.co/JnZrPVP/Whats-App-Image-2020-03-23-at-09-15-17.jpg",
      displayName: "Fauzan Muhtadi",
      quotes: "Today must better than yesterday",
      githubUrl: "https://github.com/fauzanmuhtadi/BootcampG2AcademyBatch2",
    },
    {
      uid: 6,
      type: 1,
      username: "rifqi",
      password: "6",
      profileUrl:
        "https://media-exp1.licdn.com/dms/image/C5103AQEjYXhFOKvyvg/profile-displayphoto-shrink_100_100/0?e=1599091200&v=beta&t=e7cIbyA6jPBM8nLwgTd_nmQfR7ltDd9DNsPFkBq_1Y8",
      displayName: "Rifqi Fakhirin",
      quotes: "Being good is about how to combine consistency and integrity",
      githubUrl: "https://github.com/rifqifakhirin",
    },
    {
      uid: 7,
      type: 1,
      username: "ryan",
      password: "7",
      profileUrl: "https://i.ibb.co/kQMJF86/DSC-7410.jpg",
      displayName: "Ryan Suryohadiprojo S",
      quotes: "ASK! Attitude, Skill and Knowledge",
      githubUrl: "https://github.com/RYANSUTODIWIRYO",
    },
    // TODO
    {
      uid: 8,
      type: 1,
      username: "yusal",
      password: "8",
      profileUrl: "",
      displayName: "Yusal Sumardi",
      quotes:
        "Aku Lebih Memilih Untuk Merobek Otakku, Membawanya Ke Perempatan Terdekat, Dan Bermain Lompat Tali Dengannya Dari Pada Harus Jadi Tetangga Kalian",
      githubUrl: "https://github.com/yusalsumardi",
    },
    // TODO
    {
      uid: 9,
      type: 1,
      username: "nurul",
      password: "9",
      displayName: "M Nurul Fadhil",
      githubUrl: "https://github.com/mnurulfadhil",
    },
    {
      uid: 10,
      type: 1,
      username: "ahmad",
      password: "10",
      profileUrl: "https://i.ibb.co/yFkZY5y/photoku.jpg",
      displayName: "Ahmad Nabil",
      quotes:
        "Seharusnya kamu belajar berjalan dulu, nak! Barulah kamu bisa berlari.",
      githubUrl: "https://github.com/nbl77",
    },
  ]);
  return (
    <DatabaseContext.Provider value={{ database, setDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
};
