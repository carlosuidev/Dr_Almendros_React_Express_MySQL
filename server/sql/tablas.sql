DROP DATABASE IF EXISTS dralmendros_db;
CREATE DATABASE dralmendros_db;
USE dralmendros_db;

CREATE TABLE pacientes(
  id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(128) NOT NULL,
  telefono INT(9) NOT NULL,
  correo VARCHAR(64),
  alergias VARCHAR(128) DEFAULT ''
);

CREATE TABLE empleados(
  id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(128) NOT NULL,
  cargo VARCHAR(20) NOT NULL,
  email VARCHAR(128) NOT NULL UNIQUE,
  contrasena VARCHAR(16) NOT NULL
);

CREATE TABLE servicios(
  id INT(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  servicio VARCHAR(64) NOT NULL,
  coste DECIMAL(4,2) NOT NULL
);

CREATE TABLE citas(
  id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha VARCHAR(10),
  hora VARCHAR(5) NOT NULL,
  id_servicio INT(2) NOT NULL,
  id_empleado INT(3) NOT NULL,
  id_paciente INT(5) NOT NULL,
  descripcion VARCHAR(200),
  estado VARCHAR(25) NOT NULL DEFAULT 'Creado',
  CONSTRAINT FK_Servicio FOREIGN KEY (id_servicio) REFERENCES servicios(id) ON DELETE CASCADE,
  CONSTRAINT FK_Paciente FOREIGN KEY (id_paciente) REFERENCES pacientes(id) ON DELETE CASCADE,
  CONSTRAINT FK_Empleado FOREIGN KEY (id_empleado) REFERENCES empleados(id) ON DELETE CASCADE
);

INSERT INTO pacientes (nombre, telefono, correo, alergias) VALUES
('Juan Pérez', 666123456, 'juan.perez@correo.es', ''),
('María García', 912345678, 'maria.garcia@correo.es', 'Penicilina'),
('José Fernández', 691234567, 'jose.fernandez@correo.es', 'Aspirina'),
('Antonio López', 651234568, 'antonio.lopez@correo.es', ''),
('Pedro Sánchez', 671234569, 'pedro.sanchez@correo.es', ''),
('Ana Rodríguez', 681234570, 'ana.rodriguez@correo.es', ''),
('Luisa Martínez', 641234571, 'luisa.martinez@correo.es', ''),
('Miguel González', 631234572, 'miguel.gonzalez@correo.es', ''),
('Carmen Gómez', 621234573, 'carmen.gomez@correo.es', 'Corticoides');
  
INSERT INTO empleados (nombre, cargo, contrasena, email) VALUES
('Carlos Almendros', 'Administrador', '123456c', 'carlos@dralmendros.com'),
('Sofía Ocampo', 'Fisioterapeuta', '123456s', 'sofia@dralmendros.com'),
('Esteban Sánchez', 'Fisioterapeuta', '123456e', 'esteban@dralmendros.com'),
('Tomás Ramos', 'Auxiliar', '123456t', 'tomas@dralmendros.com');

INSERT INTO servicios (servicio, coste) VALUES
('Lesiones deportivas', 35.00),
('Rehabilitación postquirúrgica', 40.00),
('Tratamiento de dolor crónico', 37.00),
('Terapia manual', 30.00),
('Hidroterapia', 45.00),
('Electroterapia', 45.00),
('Terapia de ejercicio', 35.00);

INSERT INTO citas (id_empleado, id_paciente, id_servicio, fecha, descripcion, hora, estado) VALUES
(1, 1, 1, '04/01/2023', 'Dolor de espalda', '16:30', 'Completado'),
(1, 2, 2, '27/02/2023', 'Contractura muscular', '17:00', 'Pendiente'),
(2, 3, 3, '23/03/2023', 'Esguince de rodilla', '17:30', 'Completado'),
(3, 4, 4, '12/05/2023', 'Tendinitis', '18:00', 'Completado'),
(3, 5, 5, '21/06/2023', 'Fractura de muñeca', '18:30', 'Pendiente'),
(3, 6, 6, '01/06/2023', 'Lumbago', '19:00', 'Completado'),
(1, 7, 7, '08/06/2023', 'Hombro congelado', '19:30', 'Completado'),
(1, 8, 3, '14/07/2023', 'Ciática', '20:00', 'Pendiente'),
(2, 9, 2, '15/07/2023', 'Artrosis', '20:30', 'Completado'),
(1, 9, 1, '21/07/2023', 'Escoliosis', '21:00', 'Completado'),
(2, 1, 1, '04/08/2023', 'Dolor de cabeza', '16:30', 'Pendiente'),
(3, 2, 2, '08/08/2023', 'Fatiga', '17:00', 'Completado'),
(1, 3, 3, '15/09/2023', 'Neuralgia', '17:30', 'Completado'),
(3, 4, 4, '01/10/2023', 'Parálisis', '18:00', 'Pendiente'),
(1, 5, 5, '18/11/2023', 'Esclerosis múltiple', '18:30', 'Completado'),
(1, 6, 6, '17/12/2023', 'Parálisis cerebral', '19:00', 'Completado'),
(2, 7, 7, '20/12/2023', 'Poliomielitis', '19:30', 'Pendiente'),
(2, 8, 1, '23/12/2023', 'Traumatismo craneoencefálico', '20:00', 'Completado');