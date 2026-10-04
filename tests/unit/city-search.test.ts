import { expect, test } from 'vitest';
import { citySearch } from '@/lib/city-search';

test('normaliza acentos, espaços e pontuação para pesquisar municípios', () => {
  expect(citySearch('  São José  do Rio Preto  ')).toEqual({ query: 'sao jose do rio preto' });
  expect(citySearch('Belém')).toEqual({ query: 'belem' });
});
test('separa a UF quando informada depois da cidade', () => {
  expect(citySearch('Bom Jesus — RS')).toEqual({ query: 'bom jesus', state: 'RS' });
  expect(citySearch('São Paulo/sp')).toEqual({ query: 'sao paulo', state: 'SP' });
  expect(citySearch('Brasília DF')).toEqual({ query: 'brasilia', state: 'DF' });
});
test('mantém termos que não sejam uma UF válida e siglas isoladas', () => {
  expect(citySearch('Porto de Moz')).toEqual({ query: 'porto de moz' });
  expect(citySearch('SP')).toEqual({ query: 'sp' });
  expect(citySearch('cidade ZZ')).toEqual({ query: 'cidade zz' });
});
test('remove curingas e operadores, preservando apenas termos literais', () => {
  expect(citySearch('%_São%Paulo_')).toEqual({ query: 'sao paulo' });
  expect(citySearch("Rio'); DROP TABLE cities; --")).toEqual({ query: 'rio drop table cities' });
  expect(citySearch('%_')).toEqual({ query: '' });
});
test('limita o texto recebido pela API e aceita consultas vazias', () => {
  expect(citySearch('a'.repeat(100)).query).toHaveLength(60);
  expect(citySearch('')).toEqual({ query: '' });
});
