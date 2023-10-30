import { ParseUUIDPipe } from '@nestjs/common';

export enum ItemStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Item {
  id: ParseUUIDPipe;
  content: string;
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
}
