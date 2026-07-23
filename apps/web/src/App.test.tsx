import assert from 'node:assert/strict';
import test from 'node:test';
import { makeWhatsAppUrl } from './whatsapp';

test('includes the product and customer details in the WhatsApp message', () => {
    const url = decodeURIComponent(makeWhatsAppUrl('Púlpito Clássico', 'Ana', 'Campinas'));
    assert.match(url, /Púlpito Clássico/);
    assert.match(url, /Nome: Ana/);
    assert.match(url, /Cidade: Campinas/);
});
