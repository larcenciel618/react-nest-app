import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item, ItemStatus } from './items.model';
import { CreateItemDto } from './dto/create-item';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: ParseUUIDPipe): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  create(@Body() createItem: CreateItemDto): Item {
    console.log('items: ', createItem);
    return this.itemsService.create(createItem);
  }

  @Patch(':id')
  updateToDoStatus(
    @Param('id') id: ParseUUIDPipe,
    @Body('status') status: ItemStatus,
  ): Item {
    return this.itemsService.updateToDoStatus(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: ParseUUIDPipe): string {
    return this.itemsService.delete(id);
  }
}
