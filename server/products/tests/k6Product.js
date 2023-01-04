import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const products = 1000011;
  const min = 1000011 * 0.9;
  const max = 1000011;
  const product_id = Math.floor(Math.random() * (max-min) + min)

  http.get(`http://localhost:3000/products/${product_id}`);
  sleep(1);
}