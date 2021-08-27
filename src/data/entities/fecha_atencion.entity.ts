import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Horario } from './horario.entity';

@Entity({
  name: 'fechas_atencion'
})
export class FechaAtencion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
    name: "horario_id",
    default: null
  })
  horarioId: number;

  @ManyToOne(() => Horario, horario => horario.fechaAtenciones)
  @JoinColumn({
    name: "horario_id",
    referencedColumnName: "id"
  })
  horario: Horario;

  @Column({
    name: 'fecha',
    type: 'date'
  })
  fecha: string;
}