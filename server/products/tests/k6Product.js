import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
  // vus: 100,
  // duration: '30s',
  stages: [
    {target: 1000, duration: '5s'},
    {target: 1000, duration: '25s'}
  ]
}

export default function () {
  const products = 1000011;
  const min = 1000011 * 0.9;
  const max = 1000011;
  const product_id = Math.floor(Math.random() * (max-min) + min)

  const res = http.get(`http://localhost:3000/products/${product_id}`);
  check(res, { 'is 200': (r) => r.status === 200 });
  sleep(1);
}