-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS users, projects, tasks, project_users, roles, user_tasks , attachments, priorities, sections    CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    role VARCHAR(55) NOT NULL
);

CREATE TABLE project_users(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    project_id INTEGER REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE priorities(
    id SERIAL PRIMARY KEY,
    priority VARCHAR(55) NOT NULL,
    color VARCHAR(55) NOT NULL
);

CREATE TABLE sections(
    id SERIAL PRIMARY KEY,
    section VARCHAR(55) NOT NULL
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT ,
    created_at TIMESTAMP DEFAULT now(),
    due_date DATE,
    user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    project_id INTEGER REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE,
    priority_id INTEGER REFERENCES priorities(id) ON UPDATE CASCADE ON DELETE CASCADE,
    section_id INTEGER REFERENCES sections(id) ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE attachments(
    id SERIAL PRIMARY KEY ,
    attach_s3 TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    task_id INTEGER REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE
);

COMMIT;
