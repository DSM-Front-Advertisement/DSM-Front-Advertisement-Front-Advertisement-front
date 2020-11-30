const BASE_URL = "http://13.209.255.193:8080/";

const apiDefault = axios.create({
  baseURL: BASE_URL,
});

const history = [
  {
    date: "2020-09-27",
    ids: [1, 40, 41, 42, 43],
  },
  {
    date: "2020-09-26",
    ids: [1, 40, 41, 42, 43],
  },
  {
    date: "2020-09-25",
    ids: [1, 40, 41, 42, 43],
  },
  {
    date: "2020-09-24",
    ids: [1, 40, 41, 42, 43],
  },
  {
    date: "2020-09-23",
    ids: [1, 40, 41, 42, 43],
  },
];
