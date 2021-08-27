import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Doctor } from './doctor.entity';
import { FechaAtencion } from './fecha_atencion.entity';

@Entity({
  name: 'horarios'
})
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
    name: "doctor_id",
    default: null
  })
  doctorId: number;

  @ManyToOne(() => Doctor, doctor => doctor.horarios)
  @JoinColumn({
    name: "doctor_id",
    referencedColumnName: "id"
  })
  doctor: Doctor;

  @Column({
    type: 'int'
  })
  hora_inicio: number;

  @Column({
    type: 'int'
  })
  hora_fin: number;

  @OneToMany(() => FechaAtencion, fechaAtencion => fechaAtencion.horario)
  fechaAtenciones: FechaAtencion[];

  hora_inicio_fix: string;
  hora_fin_fix: string;
}