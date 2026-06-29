CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT '',
    role VARCHAR(50) NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL DEFAULT 'Wrench',
    title VARCHAR(255) NOT NULL,
    price_from VARCHAR(50) NOT NULL DEFAULT '',
    features TEXT NOT NULL DEFAULT '',
    is_popular BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL DEFAULT 'fridge',
    name VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL DEFAULT '',
    duration VARCHAR(50) NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE portfolio (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL DEFAULT 'Wrench',
    title VARCHAR(255) NOT NULL,
    problem TEXT NOT NULL DEFAULT '',
    solution TEXT NOT NULL DEFAULT '',
    duration VARCHAR(50) NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT '',
    text TEXT NOT NULL DEFAULT '',
    rating INTEGER NOT NULL DEFAULT 5,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL DEFAULT 'Советы',
    icon VARCHAR(100) NOT NULL DEFAULT 'Lightbulb',
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    read_time VARCHAR(50) NOT NULL DEFAULT '5 мин',
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT '',
    experience VARCHAR(100) NOT NULL DEFAULT '',
    skill VARCHAR(255) NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    appliance VARCHAR(100) NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password_hash, name, role) VALUES
('admin@remontpro.ru', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Администратор', 'admin'),
('editor@remontpro.ru', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Контент-менеджер', 'editor');

INSERT INTO services (icon, title, price_from, features, is_popular, sort_order) VALUES
('Refrigerator', 'Холодильники', '1 200', 'Не морозит;Течёт вода;Шум и стук;Замена компрессора', true, 1),
('WashingMachine', 'Стиральные машины', '900', 'Не сливает;Не отжимает;Замена ТЭНа;Ошибки на дисплее', true, 2),
('Microwave', 'СВЧ и духовки', '800', 'Не греет;Не включается;Замена магнетрона;Ремонт панели', false, 3),
('Tv', 'Телевизоры', '1 100', 'Нет изображения;Полосы на экране;Нет звука;Замена подсветки', false, 4),
('AirVent', 'Кондиционеры', '1 500', 'Не охлаждает;Течёт вода;Заправка фреоном;Чистка', false, 5),
('CookingPot', 'Посудомойки', '950', 'Не сливает;Не моет;Замена насоса;Протечки', false, 6);

INSERT INTO prices (category, name, price, duration, sort_order) VALUES
('fridge', 'Диагностика', 'Бесплатно', '20 мин', 1),
('fridge', 'Заправка фреоном', 'от 2 500 ₽', '1 час', 2),
('fridge', 'Замена компрессора', 'от 4 900 ₽', '2 часа', 3),
('fridge', 'Замена термостата', 'от 1 800 ₽', '40 мин', 4),
('washer', 'Диагностика', 'Бесплатно', '20 мин', 1),
('washer', 'Замена ТЭНа', 'от 1 900 ₽', '1 час', 2),
('washer', 'Замена подшипников', 'от 3 500 ₽', '2.5 часа', 3),
('washer', 'Чистка сливного насоса', 'от 1 200 ₽', '40 мин', 4),
('tv', 'Диагностика', 'Бесплатно', '20 мин', 1),
('tv', 'Замена подсветки', 'от 2 800 ₽', '1.5 часа', 2),
('tv', 'Ремонт блока питания', 'от 2 200 ₽', '1 час', 3),
('tv', 'Замена матрицы', 'от 6 500 ₽', '2 часа', 4);

INSERT INTO portfolio (icon, title, problem, solution, duration, sort_order) VALUES
('Refrigerator', 'Холодильник Bosch', 'Не охлаждал камеру', 'Заменили компрессор и заправили систему', '2 часа', 1),
('WashingMachine', 'Стиральная LG', 'Сильный шум при отжиме', 'Замена подшипников и сальника', '2.5 часа', 2),
('Tv', 'Телевизор Samsung', 'Тёмный экран', 'Восстановили подсветку матрицы', '1.5 часа', 3),
('CookingPot', 'Посудомойка Electrolux', 'Не сливала воду', 'Замена сливного насоса', '1 час', 4),
('Microwave', 'Духовка Hansa', 'Не набирала температуру', 'Замена нагревательного элемента', '40 мин', 5);

INSERT INTO reviews (name, role, text, rating, is_published, sort_order) VALUES
('Анна Петрова', 'Холодильник Bosch', 'Мастер приехал через 40 минут, быстро нашёл поломку и всё починил. Холодильник работает как новый. Очень довольна!', 5, true, 1),
('Михаил Соколов', 'Стиральная машина LG', 'Честные цены, никаких навязанных услуг. Заменили подшипники, дали гарантию 2 года. Рекомендую всем знакомым.', 5, true, 2),
('Ирина Кузнецова', 'Телевизор Samsung', 'Думала, придётся покупать новый ТВ, но ребята восстановили подсветку за полтора часа. Спасибо за профессионализм!', 5, true, 3),
('Елена Волкова', 'Посудомойка', 'Приятный мастер, всё объяснил и показал. Посудомойка снова сливает воду. Оплатила картой, выдали чек.', 5, true, 4),
('Дмитрий Орлов', 'Кондиционер Daikin', 'Заправили фреоном, почистили — в квартире снова прохладно. Приехали в тот же день. Отличный сервис!', 5, true, 5);

INSERT INTO blog_posts (category, icon, title, excerpt, read_time, published_at, sort_order) VALUES
('Советы', 'Refrigerator', 'Как продлить срок службы холодильника', 'Простые правила ухода, которые помогут технике работать годами без поломок.', '5 мин', '2026-06-25', 1),
('Инструкции', 'WashingMachine', 'Что делать, если стиралка не сливает воду', 'Пошаговая инструкция по диагностике и устранению самой частой поломки.', '7 мин', '2026-06-20', 2),
('Обзоры', 'Lightbulb', '7 признаков, что технике нужен ремонт', 'Не пропустите тревожные сигналы и сэкономьте на серьёзном ремонте.', '4 мин', '2026-06-15', 3),
('Советы', 'Tv', 'Уход за телевизором: чего нельзя делать', 'Разбираем главные ошибки, которые сокращают срок службы вашего ТВ.', '6 мин', '2026-06-10', 4);

INSERT INTO faqs (question, answer, sort_order) VALUES
('Сколько стоит вызов мастера?', 'Вызов мастера и диагностика абсолютно бесплатны при заказе ремонта. Вы платите только за сами работы и запчасти.', 1),
('Как быстро приедет мастер?', 'В среднем мастер приезжает в течение 60 минут после заявки. При экспресс-режиме — ещё быстрее. Работаем без выходных.', 2),
('Какая гарантия на ремонт?', 'На все виды работ и установленные запчасти мы даём официальную гарантию от 1 до 3 лет в зависимости от типа ремонта.', 3),
('Вы используете оригинальные запчасти?', 'Да, мы устанавливаем только оригинальные или сертифицированные аналоги, на которые распространяется гарантия.', 4),
('Можно ли оплатить картой?', 'Конечно. Принимаем наличные и безналичную оплату, выдаём чек и договор с фиксированной стоимостью.', 5);

INSERT INTO team_members (name, role, experience, skill, sort_order) VALUES
('Андрей Смирнов', 'Старший мастер', '12 лет опыта', 'Холодильное оборудование', 1),
('Павел Громов', 'Мастер-электронщик', '9 лет опыта', 'Телевизоры и СВЧ', 2),
('Сергей Белов', 'Мастер по стиралкам', '11 лет опыта', 'Стиральные машины', 3),
('Олег Зайцев', 'Климат-техник', '8 лет опыта', 'Кондиционеры', 4);

INSERT INTO requests (name, phone, appliance, message, status) VALUES
('Татьяна Иванова', '+7 (916) 111-22-33', 'fridge', 'Холодильник не морозит нижнюю камеру', 'new'),
('Сергей Кузьмин', '+7 (903) 444-55-66', 'washer', 'Стиральная машина не отжимает бельё', 'in_progress'),
('Ольга Лебедева', '+7 (925) 777-88-99', 'tv', 'На телевизоре пропало изображение', 'done');
