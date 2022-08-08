-- Database: mande_db

-- DROP DATABASE mande_db;

CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE medio_pago(
	id_medio SERIAL PRIMARY KEY,
	tipo_pago VARCHAR(50) UNIQUE
);

CREATE TABLE labor(
	id_labor SERIAL PRIMARY KEY,
	tipo_labor VARCHAR(50) UNIQUE
);

CREATE TABLE usuario(
	telefono_usuario VARCHAR(20) PRIMARY KEY,
	nombre_usuario VARCHAR(50),
    apellido_usuario VARCHAR(50),
    medio_pago INTEGER REFERENCES medio_pago,
    cc_usuario VARCHAR(20),
    email VARCHAR(100),
    direccion_usuario VARCHAR(60),
    recibo_evidencia BYTEA,
    numero_tarjeta  VARCHAR(60)
);


CREATE TABLE trabajador(
	cc_trabajador VARCHAR(50) PRIMARY KEY,
	nombre_trabajador VARCHAR(50),
	apellido_trabajador VARCHAR(50),
	estrellas FLOAT,
	estado BOOLEAN DEFAULT(false),
	direccion_trabajador VARCHAR(200),
	telefono_trabajador VARCHAR(20),
	foto_cc_trabajador BYTEA,
	foto_perfil_trabajador BYTEA
);

CREATE TABLE servicio(
    id_servicio SERIAL PRIMARY KEY,
    telefono_usuario VARCHAR(20) REFERENCES usuario,
    cc_trabajador VARCHAR(16) REFERENCES trabajador,
    id_labor INTEGER REFERENCES labor,
    fecha_servicio DATE,
    costo_servicio FLOAT,
    calificacion_servicio INTEGER
);

CREATE TABLE desempegna(
    cc_trabajador VARCHAR(16) REFERENCES trabajador,
    id_labor INTEGER REFERENCES labor,
    precio_labor FLOAT,
    descripcion_labor VARCHAR(50),
    PRIMARY KEY (cc_trabajador,id_labor)
);