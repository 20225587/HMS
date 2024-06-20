-- CREATE DATABASE IF NOT EXISTS devhms;

-- USE devhms;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user', 'doctor', 'nurse', 'secretary') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    address TEXT
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('pending', 'approved', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Insert example data into users table
INSERT INTO `users`(`id`, `username`, `email`, `password`, `role`, `created_at`) 
VALUES 
(1, 'admin', 'admin@hospital.com', '$2a$10$somethinghashed', 'doctor', NOW()),
(2, 'user1', 'user1@hospital.com', '$2a$10$anotherhashed', 'nurse', NOW()),
(3, 'user2', 'user2@hospital.com', '$2a$10$anotherhashedagain', 'secretary', NOW());

-- Insert example data into patients table
INSERT INTO `patients`(`id`, `name`, `age`, `gender`, `address`) 
VALUES 
(1, 'John Doe', 30, 'male', '123 Main St'),
(2, 'Jane Smith', 25, 'female', '456 Elm St');

-- Insert example data into appointments table
INSERT INTO `appointments`(`id`, `patient_id`, `doctor_id`, `appointment_date`, `status`) 
VALUES 
(1, 1, 1, '2023-07-01 10:00:00', 'pending'),
(2, 2, 1, '2023-07-02 11:00:00', 'approved');
