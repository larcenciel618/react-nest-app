import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ length: 500, default: null })
  // email: string;

  // @Column({ length: 500 })
  // password: string;

  @Column({ type: 'varchar', length: 256, default: '' })
  firstName: string;

  @Column({ type: 'varchar', length: 256, default: '' })
  lastName: string;

  @Column({ type: 'varchar', length: 256, default: '' })
  email: string;

  @Column({ type: 'varchar', length: 256, default: '' })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  token?: string;
}
