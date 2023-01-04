import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const count = Math.floor(Math.random() * 100);
  const page = Math.floor(1000011 / count)

  http.get(`http://localhost:3000/products?page=${page}&count=${count}`);
  sleep(1);
}