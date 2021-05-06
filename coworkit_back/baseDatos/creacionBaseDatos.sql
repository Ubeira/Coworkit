/* 
Script de creación de la base de datos para el proyecto "GESTIÓN DE COWORKING" creado por:
    Julián David Calle Cristancho
    Raúl González Seco
    Iago Ubeira Martínez
*/

CREATE DATABASE IF NOT EXISTS coworkit CHARSET "utf8mb4" COLLATE "utf8mb4_spanish_ci";

USE coworkit;

CREATE TABLE users (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    nif CHAR(9) NOT NULL,
    password VARCHAR(512) NOT NULL, -- Contraseña del usuario (cifrada)
    photo VARCHAR(50) NOT NULL DEFAULT '/defaultImg.svg', -- En caso de que un usuario no suba una foto, le asignaremos una por defecto
    email VARCHAR(100) NOT NULL UNIQUE, -- UNIQUE para que no se pueda crear más de un usuario con el mismo correo
    tel VARCHAR(30) UNIQUE, -- UNIQUE para que no se pueda crear más de un usuario con el mismo teléfono
    registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    company VARCHAR(50), -- Empresa en la que trabaja el usuario
    admin TINYINT DEFAULT 0, -- Por defecto, los usuarios no serán administradores
    verified TINYINT DEFAULT 0, -- Por defecto, un usuario no estará verificado
    deleted TINYINT DEFAULT 0, -- Por defecto, un usuario no está eliminado
    validation_code CHAR(100), -- Codigo de validación del correo electrónico
    recovery_code  CHAR(100), -- Código  de recuperación de la contraseña
    last_auth_date DATETIME, -- Última autenticación del usuario
    CONSTRAINT users_admin_ck1 CHECK (admin = 1 OR admin = 0), -- Hacemos que el campo administrador se asemeje a un booleano
	CONSTRAINT users_verified_ck2 CHECK (verified = 1 OR verified = 0), -- Hacemos que el campo verificado se asemeje a un booleano
    CONSTRAINT users_deleted_ck3 CHECK (deleted = 1 OR deleted = 0)
);

CREATE TABLE spaces (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	type ENUM("Sala de reuniones", "Oficina individual", "Auditorio", "Sala audiovisual", "Oficina compartida") NOT NULL, -- Solo existirán los tipos de spaces aquí definidos
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL, 
    price SMALLINT UNSIGNED NOT NULL,
    capacity SMALLINT UNSIGNED NOT NULL,
    enabled TINYINT DEFAULT 1,
    CONSTRAINT spaces_price_ck1 CHECK (price > 0),
    CONSTRAINT spaces_capacity_ck2 CHECK (capacity > 0),
    CONSTRAINT spaces_enabled_ck3 CHECK (enabled = 0 OR enabled = 1)
);

CREATE TABLE photos (
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(50) UNIQUE NOT NULL, -- URL de la imagen
	space_id INT UNSIGNED,  
    CONSTRAINT spaces_photos_fk1 FOREIGN KEY (space_id)
		REFERENCES spaces (ID)
);

CREATE TABLE packs ( -- Los packs serán conjuntos preestablecidos de servicios que se incluirán en el pedido
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) UNIQUE NOT NULL, -- Algunos de los tipos de packs que existirán, se añadirán más durante el desarrollo del proyecto 
    content TEXT NOT NULL, -- Todos los servicios que incluirá cada pack (mayor velocidad de conexión, proyector, acceso a cafetería...)
    price SMALLINT UNSIGNED NOT NULL,
    enabled TINYINT DEFAULT 1,
    photo VARCHAR(50) NOT NULL, -- URL de la imagen
     CONSTRAINT packs_enabled_ck1 CHECK (enabled = 0 OR enabled = 1)
);

CREATE TABLE reviews (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    comment VARCHAR(500) NOT NULL, 
    score TINYINT UNSIGNED DEFAULT 5, 
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    user_id INT UNSIGNED NOT NULL, 
    space_id INT UNSIGNED NOT NULL,     
    CONSTRAINT reviews_users_fk1 FOREIGN KEY (user_id) 
        REFERENCES users (ID), 
    CONSTRAINT reviews_spaces_fk2 FOREIGN KEY (space_id) 
        REFERENCES spaces (ID), 
    CONSTRAINT reviews_score_ck1 CHECK (score BETWEEN 1 AND 10)
);

CREATE TABLE reports (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Hardware', 'Software', 'Conectividad', 'Limpieza', 'Atención al cliente', 'Otros') NOT NULL, 
    description VARCHAR(500) NOT NULL,
    solved TINYINT DEFAULT 0, -- Por defecto, un reporte no estará resuelto (0) al momento de publicarlo 
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photo VARCHAR(50) UNIQUE,
    user_id INT UNSIGNED NOT NULL,
    space_id INT UNSIGNED NOT NULL,
    CONSTRAINT reports_users_fk1 FOREIGN KEY (user_id)
        REFERENCES users (ID),
    CONSTRAINT reports_spaces_fk2 FOREIGN KEY (space_id)
        REFERENCES spaces (ID),
    CONSTRAINT reports_solved_ck1 CHECK (solved IN (0 , 1)) -- Hacemos que el campo resuelta se asemeje a un booleano
);

CREATE TABLE orders (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Momento en el que se realiza la reserva
    start_date DATE NOT NULL, -- Fecha de inicio del periodo reservado
    end_date DATE NOT NULL,	-- Fecha final del periodo reservado
    price SMALLINT UNSIGNED NOT NULL, -- Precio total del pedido (precio pack + precio espacio)
    user_id INT UNSIGNED NOT NULL,
    space_id INT UNSIGNED NOT NULL,
    pack_id INT UNSIGNED NOT NULL,
    CONSTRAINT orders_users_fk1 FOREIGN KEY (user_id)
        REFERENCES users (ID),
    CONSTRAINT orders_spaces_fk2 FOREIGN KEY (space_id)
        REFERENCES spaces (ID),
    CONSTRAINT orders_packs_fk3 FOREIGN KEY (pack_id)
        REFERENCES packs (ID),
    CONSTRAINT spaces_start_date_uq1 UNIQUE (space_id, start_date), -- Nos aseguramos que no se puede reservar el mismo espacio en la misma fecha más de una vez
    CONSTRAINT spaces_end_date_uq2 UNIQUE (space_id, end_date),  -- Nos aseguramos que no se puede reservar el mismo espacio en la misma fecha más de una vez
    CONSTRAINT orders_price_ck1 CHECK(price > 0),
    CONSTRAINT orders_dates_ck2 CHECK(start_date <= end_date AND DATE(order_date) <= start_date) /* Nos aseguramos de que la fecha de inicio de la reserva es anterior 																								antes del día en el que se realiza el pedido */    
	);       
    