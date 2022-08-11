\c mande_db

--Medios de pago por defecto
INSERT INTO medio_pago VALUES(1, 'Débito'),(2, 'Crédito');

--Labores predefinidas
INSERT INTO labor VALUES(1, 'Jardinería'), (2, 'Peluquería'), (3, 'Clases de baile'), (4, 'Cocina'), (5, 'Clases de piano'), (6, 'Sistemas');

--Usuario de ejemplo
INSERT INTO usuario VALUES('3404000000','Leo', 'Messi','calicol2022', 1,'1234567890','leo@hotmail.com', 'cali valle', NULL, '123');