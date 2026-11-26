import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateGadgetDto } from './dto/create-gadget.dto.js';
import { UpdateGadgetDto } from './dto/update-gadget.dto.js';
import type { Gadget } from './entities/gadget.entity.js';
import { GadgetsService } from './gadgets.service.js';

@Controller('gadgets')
export class GadgetsController {
  constructor(private readonly gadgetsService: GadgetsService) {}

  @Get()
  @Header('X-API-Version', '1.0')
  @Header('X-Service-Status', 'operational')
  findAll(
    @Query('search') search?: string,
    @Query('limit') limit?: string,
  ): Gadget[] {
    return this.gadgetsService.findAll(search, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Gadget {
    return this.gadgetsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGadgetDto: CreateGadgetDto): Gadget {
    return this.gadgetsService.create(createGadgetDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGadgetDto: UpdateGadgetDto,
  ): Gadget {
    return this.gadgetsService.update(id, updateGadgetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.gadgetsService.remove(id);
  }
}
