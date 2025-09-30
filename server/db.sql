CREATE DATABASE restaurant_db;

-- Stores Cuisines
CREATE TABLE categories(
    category_id SERIAL NOT NULL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);

-- Stores Dishes that belong in cuisines
CREATE TABLE dishes(
    dish_id SERIAL NOT NULL PRIMARY KEY,
    dish_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    description TEXT
);

INSERT INTO categories(category_name) VALUES
('Italian'),
('Chinese'),
('Mexican'),
('Indian'),
('American');

INSERT INTO dishes(dish_name, price, category_id, description) VALUES
('Spaghetti Carbonara', 300, 1, 'Classic Italian pasta with eggs, cheese, pancetta, and pepper.'),
('Margherita Pizza', 250, 1, 'Traditional pizza with tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.'),
('Kung Pao Chicken', 350, 2, 'Spicy stir-fry dish made with chicken, peanuts, vegetables, and chili peppers.'),
('Sweet and Sour Pork', 320, 2, 'Crispy pork in a tangy sweet and sour sauce with pineapple and bell peppers.'),
('Tacos al Pastor', 280, 3, 'Marinated pork tacos served with pineapple, onions, and cilantro.'),
('Guacamole', 150, 3, 'Creamy avocado dip mixed with lime juice, onions, tomatoes, and cilantro.'),
('Butter Chicken', 400, 4, 'Rich and creamy chicken curry made with butter and tomatoes.'),
('Palak Paneer', 350, 4, 'Spinach and cottage cheese cooked with spices.'),
('Cheeseburger', 300, 5, 'JAuicy beef patty topped with cheese in a bun with lettuce, tomato, and pickles.'),
('Fried Chicken', 320, 5, 'Crispy fried chicken seasoned with herbs and spices.');



CREATE TABLE contact(
    contact_id SERIAL NOT NULL PRIMARY KEY,
    contact_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(50) NOT NULL, 
    contact_email VARCHAR(50) NOT NULL,
    contact_feedback TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contact(contact_name, contact_number, contact_email, contact_feedback) VALUES ('Adya Mishra', 8982785968, 'mishraadya8@gmail.com', 'Nice Website!');