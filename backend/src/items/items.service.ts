import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { Item, ItemStatus } from './items.model';
import { CreateItemDto } from './dto/create-item';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
  private todoItems: Item[] = [];

  findAll() {
    return 'findAll method called';
  }

  findById(id: ParseUUIDPipe): Item {
    return this.todoItems.find((item) => item.id === id);
  }

  create(createItem: CreateItemDto): Item {
    const item: Item = {
      id: uuid(),
      ...createItem,
      status: ItemStatus.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todoItems.push(item);
    return item;
  }

  updateToDoStatus(id: ParseUUIDPipe, status: ItemStatus): Item {
    const targetItem = this.findById(id);
    targetItem.status = status;
    return targetItem;
  }

  delete(id: ParseUUIDPipe): string {
    this.todoItems = this.todoItems.filter((item) => item.id !== id);
    return `item_id: ${id} delete success`;
  }
}
