import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { CreateGadgetDto } from './dto/create-gadget.dto.js';
import type { UpdateGadgetDto } from './dto/update-gadget.dto.js';
import type { Gadget } from './entities/gadget.entity.js';

@Injectable()
export class GadgetsService {
  private readonly gadgets: Gadget[] = [
    {
      id: '1',
      title: 'Ноутбук Pro 16',
      price: 45000,
      warrantyMonths: 24,
      cpu: 'M3 Max',
      ramGb: 36,
    },
    {
      id: '2',
      title: 'Смартфон Nova',
      price: 28000,
      warrantyMonths: 12,
      cpu: 'A18',
      ramGb: 8,
    },
  ];

  findAll(search?: string, limit?: string): Gadget[] {
    const normalizedSearch = search?.trim().toLowerCase();
    const matchingGadgets = normalizedSearch
      ? this.gadgets.filter((gadget) =>
          gadget.title.toLowerCase().includes(normalizedSearch),
        )
      : [...this.gadgets];

    if (limit === undefined) {
      return matchingGadgets;
    }

    const parsedLimit = Number(limit);
    if (!Number.isInteger(parsedLimit) || parsedLimit < 1) {
      throw new BadRequestException(
        'Параметр limit має бути додатним цілим числом',
      );
    }

    return matchingGadgets.slice(0, parsedLimit);
  }

  findOne(id: string): Gadget {
    const gadget = this.gadgets.find((item) => item.id === id);
    if (!gadget) {
      throw new NotFoundException(`Гаджет з ID ${id} не знайдено`);
    }

    return gadget;
  }

  create(createGadgetDto: CreateGadgetDto): Gadget {
    const gadget = Object.assign({ id: randomUUID() }, createGadgetDto);
    this.gadgets.push(gadget);
    return gadget;
  }

  update(id: string, updateGadgetDto: UpdateGadgetDto): Gadget {
    const gadget = this.findOne(id);
    Object.assign(gadget, updateGadgetDto);
    return gadget;
  }

  remove(id: string): void {
    const index = this.gadgets.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Гаджет з ID ${id} не знайдено`);
    }

    this.gadgets.splice(index, 1);
  }
}
