import { ManyToOne, PrimaryGeneratedColumn, Entity, Column, JoinColumn, OneToMany } from 'typeorm';
import { CitaMedica } from './cita_medica.entity';
import { Especialidad } from './especialidad.entity';
import { Horario } from './horario.entity';

@Entity({
  name: 'doctores'
})
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "int",
    name: "especialidad_id",
    default: null
  })
  especialidadId: number;

  @ManyToOne(() => Especialidad, especialidad => especialidad.doctores)
  @JoinColumn({
    name: "especialidad_id",
    referencedColumnName: "id"
  })
  especialidad: Especialidad;

  @Column({
    length: 64
  })
  nombres: string;

  @Column({
    length: 64
  })
  apellidos: string;

  @OneToMany(() => Horario, horario => horario.doctor)
  horarios: Horario[];

  @OneToMany(() => CitaMedica, citaMedica => citaMedica.doctor)
  citasMedicas: CitaMedica[];
}