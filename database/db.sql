

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE comodifyBD;

USE comodifyBD;

-- Base de datos: `comodifyBD`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `idUser`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casosgravespasajeros`
--

CREATE TABLE `casosgravespasajeros` (
  `idCaso` int(11) NOT NULL,
  `idPasajero` int(11) NOT NULL,
  `denuncia` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `casosgravespasajeros`
--

INSERT INTO `casosgravespasajeros` (`idCaso`, `idPasajero`, `denuncia`) VALUES
(1, 1, 'hlsd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductores`
--

CREATE TABLE `conductores` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `edad` varchar(150) NOT NULL,
  `identificacion` varchar(150) NOT NULL,
  `celular` varchar(150) NOT NULL,
  `departamento` varchar(150) NOT NULL,
  `municipio` varchar(150) NOT NULL,
  `placa` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `responsabilidad` varchar(100) NOT NULL,
  `disponible` varchar(100) NOT NULL,
  `denuncias` int(11) NOT NULL,
  `multa` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `conductores`
--

INSERT INTO `conductores` (`id`, `idUser`, `nombre`, `apellido`, `edad`, `identificacion`, `celular`, `departamento`, `municipio`, `placa`, `modelo`, `responsabilidad`, `disponible`, `denuncias`, `multa`) VALUES
(8, 12, 'Jorge Henrique', 'Argona alvarez', '45', '1000000000', '1111111111', 'Antioquia', 'Medellin', 'eek-352', 'Motocicleta', 'SI', 'Si', 5, ''),
(9, 15, 'Willian ', 'Guerrero', '35', '1000000000', '0000000000', 'Antioquia', 'Medellin', 'xxx000', 'Automovil', 'SI', 'Si', 0, ''),
(10, 16, 'Cristian', 'Hurtado', '25', '1000000000', '0000000000', 'Antioquia', 'Medellin', 'gry-462', 'Automovil', 'SI', 'Si', 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajeros`
--

CREATE TABLE `pasajeros` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `edad` varchar(150) NOT NULL,
  `identificacion` varchar(150) NOT NULL,
  `celular` varchar(150) NOT NULL,
  `departamento` varchar(150) NOT NULL,
  `municipio` varchar(150) NOT NULL,
  `responsabilidad` varchar(5) NOT NULL,
  `denuncias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pasajeros`
--

INSERT INTO `pasajeros` (`id`, `idUser`, `nombre`, `apellido`, `edad`, `identificacion`, `celular`, `departamento`, `municipio`, `responsabilidad`, `denuncias`) VALUES
(1, 13, 'Patricia', 'Robledo Marquez', '23', '1000000088', '1111111111', 'Antioquia', 'medellin', 'SI', 1),
(2, 14, 'pedro', 'hernandez', '35', '0000000000', '1111111111', 'Antioquia', 'Medellin', 'SI', 5),
(3, 17, 'claudia', 'rosero', '23', '1000000009', '1111111111', 'Antioquia', 'Medellin', 'SI', 2),
(4, 18, 'gabriel', 'Monsalve', '25', '0000000000', '0000000000', 'Antioquia', 'Medellin', 'SI', 1),
(5, 20, 'Armando', 'santana', '25', '2345678123', '0000000000', 'Antioquia', 'medellin', 'SI', 0),
(6, 21, 'samanta', 'saldarriaga', '42', '0987654321', '1234567890', 'Antioquia', 'medellin', 'SI', 3),
(7, 22, 'Doris', 'Morales', '54', '5432109876', '0987651234', 'Antioquia', 'Medellin', 'SI', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `id` int(11) NOT NULL,
  `idConductor` int(11) NOT NULL,
  `dias` varchar(100) NOT NULL,
  `hora` varchar(10) NOT NULL,
  `asientos` varchar(150) NOT NULL,
  `lugarInicial` varchar(150) NOT NULL,
  `localidad` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `lugarFinal` varchar(150) NOT NULL,
  `comentario` varchar(10000) NOT NULL,
  `parada1` varchar(150) NOT NULL,
  `precioParada1` int(11) NOT NULL,
  `parada2` varchar(100) NOT NULL,
  `precioParada2` int(11) NOT NULL,
  `parada3` varchar(100) NOT NULL,
  `precioParada3` int(11) NOT NULL,
  `parada4` varchar(100) NOT NULL,
  `precioParada4` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fechaInicial` varchar(100) NOT NULL,
  `ocupacion` varchar(100) NOT NULL,
  `precioPagar` int(100) NOT NULL,
  `linkCobro` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ruta`
--

INSERT INTO `ruta` (`id`, `idConductor`, `dias`, `hora`, `asientos`, `lugarInicial`, `localidad`, `modelo`, `lugarFinal`, `comentario`, `parada1`, `precioParada1`, `parada2`, `precioParada2`, `parada3`, `precioParada3`, `parada4`, `precioParada4`, `fechaCreacion`, `fechaInicial`, `ocupacion`, `precioPagar`, `linkCobro`) VALUES
(6, 8, 'Todos los dias de la semana', '6 AM', '4', 'Cancha las esmeraldas', 'manrique', 'Motocicleta', 'Belen', 'ffasdf', 'Terminal del norte', 2700, '', 0, '', 0, '', 0, '2021-11-27 22:00:28', '2021-09-08', 'Ocupada', 0, ''),
(7, 9, 'Todos los dias de la semana', '5:00Am', '2', 'Estación las esmeraldas', 'manrique', 'Automovil', 'Bello', 'fdsdfas', 'medellin', 2500, 'Estación industriales metro', 2500, 'Cerro el volador', 2500, 'Estación La palma', 2500, '2021-11-27 21:33:35', '2021-11-03', 'Disponible', 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2g9p3KI_52hPc3qblcKFaB4sAr5VgE6m', 1638139239, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":12}}'),
('c-Nkkr-PDwIC9uPb_Rbe7d0asFA6vmh4', 1638068181, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":15}}'),
('mn-fUTYWiKwyZx8kF0rkvuSvwefvDe-N', 1638119831, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":15}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id` int(11) NOT NULL,
  `idRuta` int(11) NOT NULL,
  `idPasajero` int(11) NOT NULL,
  `parada` varchar(100) NOT NULL,
  `precio` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `puntuacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `pass` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `pass`, `email`) VALUES
(1, 'admin0001', '$2a$10$LLYfeTKy/Hk4ukgGbRXBp.p5J5MJ.7qY53WwPmXssTL5d/9aGGKkS', 'henryasdrubalrodriguezmorales@gmail.com'),
(12, 'Jorge21', '$2a$10$xbPcugEje71kTdbDwtCP6OjuIlKxFGPFck59IDcVwTAmxNyahMRK2', 'enrique21@Hotmail.com'),
(13, 'patricia', '$2a$10$zwVEXrXrut8iOgpHbmcHpugih9UO09rwYTH8stzSWjn1LnDaVKNk6', 'patriacar@gmail.com'),
(14, 'andresP', '$2a$10$YRoNmiHVGxHaI3OfemgX6Ok3KxqxTi9cgiRPAuDU7NT6TH5kiXHIG', 'andresPerezJimenez@gmail.com'),
(15, 'willian200', '$2a$10$tWhnhQGbuz2HfbUgPGh.6ujL9nBr3XOxu5vSp/V3kzHRc0HBuDmli', 'willianRamirez@gmail.com'),
(16, 'cristianHur', '$2a$10$5dZK84QqxractIf6djhbEe3VxVGGt1HDzPSxkgKuinByFgTTkqxQy', 'cristianDavid2002@gmail.com'),
(17, 'claudia', '$2a$10$GTghd59NMLc2i4J1jrm9Lev7ksjs3Qx7rtq0zE5S6902ktO/M2so6', 'claudiaramon@renobas.com'),
(18, 'gabriel', '$2a$10$medSXWdtZHJsqfPoyCm04OsSoShp7bY2gLS.vFGNK/Ht3wYFnWbiW', 'gabrielZpata@gmail.com'),
(20, 'ArmandoLiso', '$2a$10$R3O2oKZyTb0vbErVfxW3f.DF3j.PJeMJzae/L6.i7Iu0xr0um.yka', 'LisoArmando@Hotmail.com'),
(21, 'Saldarria', '$2a$10$sKPexXqRZwkX38Crgeugzu9TNKW03Y2Dwbzz7mKLKY3abz5vs5Sy.', 'henryasdrubalrodriguez@gmail.com'),
(22, 'doris', '$2a$10$tMrTka98zHB.rY9ooFDmleX2wzm1NzJdk0uVY77bZlh4YyVKWr9te', 'doris19991@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `id` int(11) NOT NULL,
  `idRuta` int(11) NOT NULL,
  `idPasajero` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `parada` varchar(100) NOT NULL,
  `precio` int(11) NOT NULL,
  `comentario` varchar(500) NOT NULL,
  `acciones` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`id`, `idRuta`, `idPasajero`, `nombre`, `parada`, `precio`, `comentario`, `acciones`) VALUES
(14, 6, 1, 'Patricia', 'Terminal del norte', 2700, 'ffasdf', 'Actividad de ruta'),
(15, 6, 3, 'claudia', 'Terminal del norte', 2700, 'ffasdf', 'Actividad de ruta'),
(16, 6, 4, 'gabriel', 'Terminal del norte', 2700, 'ffasdf', 'Actividad de ruta'),
(17, 6, 5, 'Armando', 'Terminal del norte', 2700, 'ffasdf', 'Actividad de ruta');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `casosgravespasajeros`
--
ALTER TABLE `casosgravespasajeros`
  ADD PRIMARY KEY (`idCaso`),
  ADD KEY `idPasajero` (`idPasajero`);

--
-- Indices de la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUser` (`idUser`);

--
-- Indices de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idUser` (`idUser`),
  ADD KEY `idUser_2` (`idUser`),
  ADD KEY `idUser_3` (`idUser`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `condu-ruta` (`idConductor`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRuta` (`idRuta`),
  ADD KEY `pasa-soli` (`idPasajero`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ruta-viaje` (`idRuta`),
  ADD KEY `idPasajero` (`idPasajero`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `casosgravespasajeros`
--
ALTER TABLE `casosgravespasajeros`
  MODIFY `idCaso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `conductores`
--
ALTER TABLE `conductores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ruta`
--
ALTER TABLE `ruta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `casosgravespasajeros`
--
ALTER TABLE `casosgravespasajeros`
  ADD CONSTRAINT `denuncia-pasajero` FOREIGN KEY (`idPasajero`) REFERENCES `pasajeros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD CONSTRAINT `conductor-user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD CONSTRAINT `Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD CONSTRAINT `condu-ruta` FOREIGN KEY (`idConductor`) REFERENCES `conductores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `pasa-soli` FOREIGN KEY (`idPasajero`) REFERENCES `pasajeros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ruata-soli` FOREIGN KEY (`idRuta`) REFERENCES `ruta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `ruta-viaje` FOREIGN KEY (`idRuta`) REFERENCES `ruta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `viaje-pasajero` FOREIGN KEY (`idPasajero`) REFERENCES `pasajeros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
