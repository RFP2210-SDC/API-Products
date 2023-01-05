import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  // vus: 10,
  // duration: '30s',
  // stages: [
  //   {target: 1000, duration: '5s'},
  //   {target: 1000, duration: '25s'}
  // ]
  stages: [
    {target: 1000, duration: '5s'},
    {target: 2000, duration: '10s'},
    {target: 3000, duration: '10s'},
    {target: 4000, duration: '10s'}
  ]
}

export default function () {
  const count = Math.floor(Math.random() * 100);
  const page = Math.floor(1000011 / count);

  const res = http.get(`http://localhost:3000/products?page=${page}&count=${count}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}