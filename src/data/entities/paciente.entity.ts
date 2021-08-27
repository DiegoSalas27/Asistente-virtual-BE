import { ManyToOne, PrimaryGeneratedColumn, Entity, Column, JoinColumn, OneToMany } from 'typeorm';
import { CitaMedica } from './cita_medica.entity';
import { Especialidad } from './especialidad.entity';
import { Horario } from './horario.entity';

@Entity({
  name: 'pacientes'
})
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'codigo_conadis',
    length: 64
  })
  codigoConadis: string;

  @Column({
    length: 64
  })
  password: string;
  
  @Column({
    length: 64
  })
  nombres: string;

  @Column({
    length: 64
  })
  apellidos: string;

  @Column({
    length: 64
  })
  telefono: string;

  @Column({
    length: 64
  })
  direccion: string;

  @Column({
    name: 'fecha_nacimiento',
    type: 'date'
  })
  fechaNacimiento: string;

  @OneToMany(() => CitaMedica, citaMedica => citaMedica.doctor)
  citasMedicas: CitaMedica[];
}