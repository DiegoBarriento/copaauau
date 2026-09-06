DROP SCHEMA IF EXISTS controle_album;
CREATE SCHEMA controle_album;
USE controle_album;

CREATE TABLE cliente 
(
  cd_cpf_cliente VARCHAR(15),
  nm_cliente VARCHAR(100),
  nm_senha VARCHAR(64),
  CONSTRAINT pk_cliente PRIMARY KEY (cd_cpf_cliente)
);

CREATE TABLE time 
(
  cd_time INT,
  nm_time VARCHAR(100),
  CONSTRAINT pk_time PRIMARY KEY (cd_time)
);

CREATE TABLE figura 
(
  cd_figura INT,
  nm_figura VARCHAR(100),
  cd_time INT,
  CONSTRAINT pk_figura PRIMARY KEY (cd_figura),
  CONSTRAINT fk_figura_time FOREIGN KEY (cd_time) REFERENCES time (cd_time)
);

CREATE TABLE album 
(
  cd_cpf_cliente VARCHAR(15),
  cd_figura INT,
  ic_possui TINYINT,
  CONSTRAINT pk_album PRIMARY KEY (cd_cpf_cliente, cd_figura),
  CONSTRAINT fk_cliente_figura_cliente FOREIGN KEY (cd_cpf_cliente)  REFERENCES cliente (cd_cpf_cliente),
  CONSTRAINT fk_cliente_figura_figura FOREIGN KEY (cd_figura) REFERENCES figura (cd_figura)
);

CREATE TABLE figura_repetida 
(
  cd_cpf_cliente VARCHAR(15),
  cd_figura INT,
  qt_repetidas INT,
  CONSTRAINT pk_figura_repetida PRIMARY KEY (cd_cpf_cliente, cd_figura),
  CONSTRAINT fk_cliente_figura_cliente2 FOREIGN KEY (cd_cpf_cliente) REFERENCES cliente (cd_cpf_cliente),
  CONSTRAINT fk_cliente_figura_figura2 FOREIGN KEY (cd_figura) REFERENCES figura (cd_figura)
);

Insert into time values (0, 'Creche Clube Au Au');
Insert into time values (1, 'Brasil');
Insert into time values (2, 'Alemanha');
Insert into time values (3, 'Inglaterra');
Insert into time values (4, 'Portugal');
Insert into time values (5, 'Estados Unidos');
Insert into time values (6, 'Argentina');
Insert into time values (7, 'França');
Insert into time values (8, 'Espanha');
Insert into time values (9, 'Bélgica');

Insert into figura values ( 1, 'Logo do Clube Au Au', 0);
Insert into figura values ( 2, 'Brasão do Time', 1);
Insert into figura values ( 3, 'Bella', 1);
Insert into figura values ( 4, 'Bonifácio', 1);
Insert into figura values ( 5, 'Athila', 1);
Insert into figura values ( 6, 'Capitu', 1);
Insert into figura values ( 7, 'Charlie', 1);
Insert into figura values ( 8, 'Chico', 1);
Insert into figura values ( 9, 'Duque', 1);
Insert into figura values (10, 'Atum', 1);
Insert into figura values (11, 'Koda', 1);
Insert into figura values (12, 'Gaia', 1);
Insert into figura values (13, 'Corote', 1);
Insert into figura values (14, 'Brasão do Time', 2);
Insert into figura values (15, 'Brownie', 2);
Insert into figura values (16, 'Carmel', 2);
Insert into figura values (17, 'Chiara', 2);
Insert into figura values (18, 'Sol', 2);
Insert into figura values (19, 'Dom', 2);
Insert into figura values (20, 'Agnes', 2);
Insert into figura values (21, 'Estrela', 2);
Insert into figura values (22, 'Rockie', 2);
Insert into figura values (23, 'Jorge', 2);
Insert into figura values (24, 'Matilda', 2);
Insert into figura values (25, 'Luke', 2);
Insert into figura values (26, 'Brasão do Time', 3);
Insert into figura values (27, 'Cadu', 3);
Insert into figura values (28, 'Café', 3);
Insert into figura values (29, 'Chico', 3);
Insert into figura values (30, 'Django', 3);
Insert into figura values (31, 'Hadi', 3);
Insert into figura values (32, 'Luke', 3);
Insert into figura values (33, 'Dudu', 3);
Insert into figura values (34, 'Dobby', 3);
Insert into figura values (35, 'Amora', 3);
Insert into figura values (36, 'Luna', 3);
Insert into figura values (37, 'Vito', 3);
Insert into figura values (38, 'Brasão do Time', 4);
Insert into figura values (39, 'Jack', 4);
Insert into figura values (40, 'Jorge', 4);
Insert into figura values (41, 'Moana', 4);
Insert into figura values (42, 'Muffin', 4);
Insert into figura values (43, 'Natasha', 4);
Insert into figura values (44, 'Rafa', 4);
Insert into figura values (45, 'Teddy Benedito', 4);
Insert into figura values (46, 'Tuco', 4);
Insert into figura values (47, 'Valentin', 4);
Insert into figura values (48, 'Zé', 4);
Insert into figura values (49, 'Zeus', 4);
Insert into figura values (50, 'Brasão do Time', 5);
Insert into figura values (51, 'Bela', 5);
Insert into figura values (52, 'Bono', 5);
Insert into figura values (53, 'Maui', 5);
Insert into figura values (54, 'Nelson', 5);
Insert into figura values (55, 'Charlote', 5);
Insert into figura values (56, 'Zeus', 5);
Insert into figura values (57, 'Iron', 5);
Insert into figura values (58, 'Kyara', 5);
Insert into figura values (59, 'Zoe', 5);
Insert into figura values (60, 'Whisky', 5);
Insert into figura values (61, 'Brisa', 5);
Insert into figura values (62, 'Brasão do Time', 6);
Insert into figura values (63, 'Maya', 6);
Insert into figura values (64, 'Nestor', 6);
Insert into figura values (65, 'Anakin', 6);
Insert into figura values (66, 'Floyd', 6);
Insert into figura values (67, 'Teddy', 6);
Insert into figura values (68, 'Scott', 6);
Insert into figura values (69, 'Spike', 6);
Insert into figura values (70, 'Toddy', 6);
Insert into figura values (71, 'Bela', 6);
Insert into figura values (72, 'Malu', 6);
Insert into figura values (73, 'Aperol', 6);
Insert into figura values (74, 'Brasão do Time', 7);
Insert into figura values (75, 'Simba', 7);
Insert into figura values (76, 'Apollo Kennel', 7);
Insert into figura values (77, 'Carlito', 7);
Insert into figura values (78, 'Carlota', 7);
Insert into figura values (79, 'Bento', 7);
Insert into figura values (80, 'Joaquim', 7);
Insert into figura values (81, 'Ozzy', 7);
Insert into figura values (82, 'Miguel', 7);
Insert into figura values (83, 'Ringo', 7);
Insert into figura values (84, 'Zoe', 7);
Insert into figura values (85, 'Apollo Bento', 7);
Insert into figura values (86, 'Brasão do Time', 8);
Insert into figura values (87, 'Lola', 8);
Insert into figura values (88, 'Lucky', 8);
Insert into figura values (89, 'Luke', 8);
Insert into figura values (90, 'Simba', 8);
Insert into figura values (91, 'Meg', 8);
Insert into figura values (92, 'Luna', 8);
Insert into figura values (93, 'Madruguinha', 8);
Insert into figura values (94, 'Mabel', 8);
Insert into figura values (95, 'Aurora', 8);
Insert into figura values (96, 'Theo', 8);
Insert into figura values (97, 'Thor', 8);
Insert into figura values (98, 'Brasão do Time', 9);
Insert into figura values (99, 'Magali', 9);
Insert into figura values (100, 'Liev', 9);
Insert into figura values (101, 'Luna Tamashiro', 9);
Insert into figura values (102, 'Nina', 9);
Insert into figura values (103, 'Ozzy', 9);
Insert into figura values (104, 'Ragnar', 9);
Insert into figura values (105, 'Bartholomeu', 9);
Insert into figura values (106, 'Chico', 9);
Insert into figura values (107, 'Ringer', 9);
Insert into figura values (108, 'Francesco', 9);
Insert into figura values (109, 'Teppy', 9);
Insert into figura values (110, 'Fachada Clube Au Au', 0);

Insert into cliente values ('27765728978', 'Frederico Arco e Flexa Machado Justo', md5('123'));
Insert into cliente values ('11111111111', 'Luiz Carlos Rodrigues Tavares', md5('123'));

Insert into album values ('27765728978',  1, 0);
Insert into album values ('27765728978',  2, 1);
Insert into album values ('27765728978',  3, 0);
Insert into album values ('27765728978',  4, 1);
Insert into album values ('27765728978',  5, 1);
Insert into album values ('27765728978',  6, 1);
Insert into album values ('27765728978',  7, 1);
Insert into album values ('27765728978',  8, 1);
Insert into album values ('27765728978',  9, 0);
Insert into album values ('27765728978', 10, 0);
Insert into album values ('27765728978', 11, 1);
Insert into album values ('27765728978', 12, 1);
Insert into album values ('27765728978', 13, 1);
Insert into album values ('27765728978', 14, 0);
Insert into album values ('27765728978', 15, 1);
Insert into album values ('27765728978', 16, 1);
Insert into album values ('27765728978', 17, 1);
Insert into album values ('27765728978', 18, 1);
Insert into album values ('27765728978', 19, 1);
Insert into album values ('27765728978', 20, 1);
Insert into album values ('27765728978', 21, 1);
Insert into album values ('27765728978', 22, 0);
Insert into album values ('27765728978', 23, 1);
Insert into album values ('27765728978', 24, 1);
Insert into album values ('27765728978', 25, 1);
Insert into album values ('27765728978', 26, 1);
Insert into album values ('27765728978', 27, 1);
Insert into album values ('27765728978', 28, 1);
Insert into album values ('27765728978', 29, 1);
Insert into album values ('27765728978', 30, 1);
Insert into album values ('27765728978', 31, 1);
Insert into album values ('27765728978', 32, 1);
Insert into album values ('27765728978', 33, 1);
Insert into album values ('27765728978', 34, 1);
Insert into album values ('27765728978', 35, 0);
Insert into album values ('27765728978', 36, 1);
Insert into album values ('27765728978', 37, 1);
Insert into album values ('27765728978', 38, 1);
Insert into album values ('27765728978', 39, 1);
Insert into album values ('27765728978', 40, 1);
Insert into album values ('27765728978', 41, 0);
Insert into album values ('27765728978', 42, 1);
Insert into album values ('27765728978', 43, 0);
Insert into album values ('27765728978', 44, 1);
Insert into album values ('27765728978', 45, 1);
Insert into album values ('27765728978', 46, 1);
Insert into album values ('27765728978', 47, 0);
Insert into album values ('27765728978', 48, 1);
Insert into album values ('27765728978', 49, 0);
Insert into album values ('27765728978', 50, 0);
Insert into album values ('27765728978', 51, 1);
Insert into album values ('27765728978', 52, 1);
Insert into album values ('27765728978', 53, 1);
Insert into album values ('27765728978', 54, 1);
Insert into album values ('27765728978', 55, 0);
Insert into album values ('27765728978', 56, 1);
Insert into album values ('27765728978', 57, 1);
Insert into album values ('27765728978', 58, 1);
Insert into album values ('27765728978', 59, 1);
Insert into album values ('27765728978', 60, 0);
Insert into album values ('27765728978', 61, 1);
Insert into album values ('27765728978', 62, 1);
Insert into album values ('27765728978', 63, 1);
Insert into album values ('27765728978', 64, 0);
Insert into album values ('27765728978', 65, 1);
Insert into album values ('27765728978', 66, 1);
Insert into album values ('27765728978', 67, 1);
Insert into album values ('27765728978', 68, 1);
Insert into album values ('27765728978', 69, 1);
Insert into album values ('27765728978', 70, 1);
Insert into album values ('27765728978', 71, 1);
Insert into album values ('27765728978', 72, 1);
Insert into album values ('27765728978', 73, 1);
Insert into album values ('27765728978', 74, 0);
Insert into album values ('27765728978', 75, 1);
Insert into album values ('27765728978', 76, 0);
Insert into album values ('27765728978', 77, 1);
Insert into album values ('27765728978', 78, 1);
Insert into album values ('27765728978', 79, 1);
Insert into album values ('27765728978', 80, 1);
Insert into album values ('27765728978', 81, 1);
Insert into album values ('27765728978', 82, 1);
Insert into album values ('27765728978', 83, 1);
Insert into album values ('27765728978', 84, 1);
Insert into album values ('27765728978', 85, 1);
Insert into album values ('27765728978', 86, 1);
Insert into album values ('27765728978', 87, 0);
Insert into album values ('27765728978', 88, 0);
Insert into album values ('27765728978', 89, 1);
Insert into album values ('27765728978', 90, 0);
Insert into album values ('27765728978', 91, 1);
Insert into album values ('27765728978', 92, 1);
Insert into album values ('27765728978', 93, 0);
Insert into album values ('27765728978', 94, 0);
Insert into album values ('27765728978', 95, 1);
Insert into album values ('27765728978', 96, 1);
Insert into album values ('27765728978', 97, 0);
Insert into album values ('27765728978', 98, 0);
Insert into album values ('27765728978', 99, 1);
Insert into album values ('27765728978', 100, 1);
Insert into album values ('27765728978', 101, 0);
Insert into album values ('27765728978', 102, 1);
Insert into album values ('27765728978', 103, 0);
Insert into album values ('27765728978', 104, 1);
Insert into album values ('27765728978', 105, 1);
Insert into album values ('27765728978', 106, 1);
Insert into album values ('27765728978', 107, 1);
Insert into album values ('27765728978', 108, 1);
Insert into album values ('27765728978', 109, 1);
Insert into album values ('27765728978', 110, 0);

Insert into figura_repetida values ('27765728978', 2, 1);
Insert into figura_repetida values ('27765728978', 4, 2);
Insert into figura_repetida values ('27765728978', 7, 1);
Insert into figura_repetida values ('27765728978', 8, 1);
Insert into figura_repetida values ('27765728978', 11, 1);
Insert into figura_repetida values ('27765728978', 17, 1);
Insert into figura_repetida values ('27765728978', 20, 3);
Insert into figura_repetida values ('27765728978', 23, 1);
Insert into figura_repetida values ('27765728978', 24, 1);
Insert into figura_repetida values ('27765728978', 25, 1);
Insert into figura_repetida values ('27765728978', 27, 2);
Insert into figura_repetida values ('27765728978', 30, 2);
Insert into figura_repetida values ('27765728978', 31, 1);
Insert into figura_repetida values ('27765728978', 32, 2);
Insert into figura_repetida values ('27765728978', 36, 1);
Insert into figura_repetida values ('27765728978', 40, 1);
Insert into figura_repetida values ('27765728978', 42, 1);
Insert into figura_repetida values ('27765728978', 46, 4);
Insert into figura_repetida values ('27765728978', 54, 1);
Insert into figura_repetida values ('27765728978', 56, 1);
Insert into figura_repetida values ('27765728978', 57, 2);
Insert into figura_repetida values ('27765728978', 58, 1);
Insert into figura_repetida values ('27765728978', 59, 1);
Insert into figura_repetida values ('27765728978', 61, 1);
Insert into figura_repetida values ('27765728978', 63, 2);
Insert into figura_repetida values ('27765728978', 67, 1);
Insert into figura_repetida values ('27765728978', 69, 2);
Insert into figura_repetida values ('27765728978', 72, 1);
Insert into figura_repetida values ('27765728978', 75, 3);
Insert into figura_repetida values ('27765728978', 78, 1);
Insert into figura_repetida values ('27765728978', 80, 1);
Insert into figura_repetida values ('27765728978', 91, 1);
Insert into figura_repetida values ('27765728978', 94, 1);
Insert into figura_repetida values ('27765728978', 97, 1);
Insert into figura_repetida values ('27765728978', 99, 4);
Insert into figura_repetida values ('27765728978', 106, 2);
Insert into figura_repetida values ('27765728978', 107, 1);
Insert into figura_repetida values ('27765728978', 110, 1);

Insert into album values ('11111111111',  1, 0);
Insert into album values ('11111111111',  2,0);
Insert into album values ('11111111111',  3, 0);
Insert into album values ('11111111111',  4,0);
Insert into album values ('11111111111',  5,0);
Insert into album values ('11111111111',  6,0);
Insert into album values ('11111111111',  7,0);
Insert into album values ('11111111111',  8,0);
Insert into album values ('11111111111',  9, 0);
Insert into album values ('11111111111', 10, 0);
Insert into album values ('11111111111', 11,0);
Insert into album values ('11111111111', 12,0);
Insert into album values ('11111111111', 13,0);
Insert into album values ('11111111111', 14, 0);
Insert into album values ('11111111111', 15,0);
Insert into album values ('11111111111', 16,0);
Insert into album values ('11111111111', 17,0);
Insert into album values ('11111111111', 18,0);
Insert into album values ('11111111111', 19,0);
Insert into album values ('11111111111', 20,0);
Insert into album values ('11111111111', 21,0);
Insert into album values ('11111111111', 22, 0);
Insert into album values ('11111111111', 23,0);
Insert into album values ('11111111111', 24,0);
Insert into album values ('11111111111', 25,0);
Insert into album values ('11111111111', 26,0);
Insert into album values ('11111111111', 27,0);
Insert into album values ('11111111111', 28,0);
Insert into album values ('11111111111', 29,0);
Insert into album values ('11111111111', 30,0);
Insert into album values ('11111111111', 31,0);
Insert into album values ('11111111111', 32,0);
Insert into album values ('11111111111', 33,0);
Insert into album values ('11111111111', 34,0);
Insert into album values ('11111111111', 35, 0);
Insert into album values ('11111111111', 36,0);
Insert into album values ('11111111111', 37,0);
Insert into album values ('11111111111', 38,0);
Insert into album values ('11111111111', 39,0);
Insert into album values ('11111111111', 40,0);
Insert into album values ('11111111111', 41, 0);
Insert into album values ('11111111111', 42,0);
Insert into album values ('11111111111', 43, 0);
Insert into album values ('11111111111', 44,0);
Insert into album values ('11111111111', 45,0);
Insert into album values ('11111111111', 46,0);
Insert into album values ('11111111111', 47, 0);
Insert into album values ('11111111111', 48,0);
Insert into album values ('11111111111', 49, 0);
Insert into album values ('11111111111', 50, 0);
Insert into album values ('11111111111', 51,0);
Insert into album values ('11111111111', 52,0);
Insert into album values ('11111111111', 53,0);
Insert into album values ('11111111111', 54,0);
Insert into album values ('11111111111', 55, 0);
Insert into album values ('11111111111', 56,0);
Insert into album values ('11111111111', 57,0);
Insert into album values ('11111111111', 58,0);
Insert into album values ('11111111111', 59,0);
Insert into album values ('11111111111', 60, 0);
Insert into album values ('11111111111', 61,0);
Insert into album values ('11111111111', 62,0);
Insert into album values ('11111111111', 63,0);
Insert into album values ('11111111111', 64, 0);
Insert into album values ('11111111111', 65,0);
Insert into album values ('11111111111', 66,0);
Insert into album values ('11111111111', 67,0);
Insert into album values ('11111111111', 68,0);
Insert into album values ('11111111111', 69,0);
Insert into album values ('11111111111', 70,0);
Insert into album values ('11111111111', 71,0);
Insert into album values ('11111111111', 72,0);
Insert into album values ('11111111111', 73,0);
Insert into album values ('11111111111', 74, 0);
Insert into album values ('11111111111', 75,0);
Insert into album values ('11111111111', 76, 0);
Insert into album values ('11111111111', 77,0);
Insert into album values ('11111111111', 78,0);
Insert into album values ('11111111111', 79,0);
Insert into album values ('11111111111', 80,0);
Insert into album values ('11111111111', 81,0);
Insert into album values ('11111111111', 82,0);
Insert into album values ('11111111111', 83,0);
Insert into album values ('11111111111', 84,0);
Insert into album values ('11111111111', 85,0);
Insert into album values ('11111111111', 86,0);
Insert into album values ('11111111111', 87, 0);
Insert into album values ('11111111111', 88, 0);
Insert into album values ('11111111111', 89,0);
Insert into album values ('11111111111', 90, 0);
Insert into album values ('11111111111', 91,0);
Insert into album values ('11111111111', 92,0);
Insert into album values ('11111111111', 93, 0);
Insert into album values ('11111111111', 94, 0);
Insert into album values ('11111111111', 95,0);
Insert into album values ('11111111111', 96,0);
Insert into album values ('11111111111', 97, 0);
Insert into album values ('11111111111', 98, 0);
Insert into album values ('11111111111', 99,0);
Insert into album values ('11111111111', 100,0);
Insert into album values ('11111111111', 101, 0);
Insert into album values ('11111111111', 102,0);
Insert into album values ('11111111111', 103, 0);
Insert into album values ('11111111111', 104,0);
Insert into album values ('11111111111', 105,0);
Insert into album values ('11111111111', 106,0);
Insert into album values ('11111111111', 107,0);
Insert into album values ('11111111111', 108,0);
Insert into album values ('11111111111', 109,0);
Insert into album values ('11111111111', 110, 0);