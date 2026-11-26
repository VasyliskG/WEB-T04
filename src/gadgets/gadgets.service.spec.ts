import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GadgetsService } from './gadgets.service.js';

describe('GadgetsService', () => {
  let service: GadgetsService;

  beforeEach(() => {
    service = new GadgetsService();
  });

  it('creates, partially updates, and removes a gadget', () => {
    const created = service.create({
      title: 'Планшет Air',
      price: 22000,
      warrantyMonths: 12,
      cpu: 'A17',
      ramGb: 8,
    });

    expect(created.id).toBeTruthy();

    const updated = service.update(created.id, { price: 21000 });
    expect(updated).toMatchObject({ title: 'Планшет Air', price: 21000 });

    service.remove(created.id);
    expect(() => service.findOne(created.id)).toThrow(NotFoundException);
  });

  it('throws NotFoundException for missing gadgets', () => {
    expect(() => service.findOne('missing')).toThrow(NotFoundException);
    expect(() => service.update('missing', { title: 'Невідомий' })).toThrow(
      NotFoundException,
    );
    expect(() => service.remove('missing')).toThrow(NotFoundException);
  });

  it('filters titles case-insensitively and applies a positive limit', () => {
    expect(service.findAll('НОУТБУК')).toHaveLength(1);
    expect(service.findAll(undefined, '1')).toHaveLength(1);
    expect(service.findAll('not found')).toHaveLength(0);
  });

  it('rejects invalid limits', () => {
    expect(() => service.findAll(undefined, '0')).toThrow(BadRequestException);
    expect(() => service.findAll(undefined, 'abc')).toThrow(
      BadRequestException,
    );
  });
});
