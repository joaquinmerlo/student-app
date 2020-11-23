CREATE TABLE `school`.`new_table` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NULL,
  `direccion` VARCHAR(45) NULL,
  `poblacion` VARCHAR(45) NULL,
  `codigo_postal` INT NULL,
  `curso` VARCHAR(45) NULL,
  `new_tablecol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `escuela`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
