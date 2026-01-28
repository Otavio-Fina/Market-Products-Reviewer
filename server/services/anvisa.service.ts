// services/anvisaService.ts
import axios from 'axios';
import db from '../utils/db'; // sua camada de acesso ao DB
const BASE = 'https://api-gateway.prd.apps.anvisa.gov.br/consultas-externas-api/api/v1';

export async function getCompanyByCNPJ(cnpj: string) {
  const url = `${BASE}/empresa/${cnpj}`;
  try {
    const res = await axios.get(url, { timeout: 10000 });
    // salvar raw
    await db.query(
      'INSERT INTO anvisa_raw_responses(endpoint, request, response, status_code) VALUES($1,$2,$3,$4)',
      [url, {cnpj}, res.data, res.status]
    );
    return res.data;
  } catch (err) {
    // tratar erros, log, retry/backoff se necessário
    throw err;
  }
}

export async function searchFoodProducts(body: any) {
  const url = `${BASE}/consulta/alimento/produtos`;
  try {
    const res = await axios.post(url, body, { timeout: 20000 });
    await db.query(
      'INSERT INTO anvisa_raw_responses(endpoint, request, response, status_code) VALUES($1,$2,$3,$4)',
      [url, body, res.data, res.status]
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}
