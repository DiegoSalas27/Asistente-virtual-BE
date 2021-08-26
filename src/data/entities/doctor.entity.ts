import { ManyToOne, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { Especialidad } from './especialidad.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Especialidad, especialidad => especialidad.doctores)
  especialidad: Especialidad;

  @Column({
    length: 64
  })
  nombres: string;

  @Column({
    length: 64
  })
  apellidos: string;
}