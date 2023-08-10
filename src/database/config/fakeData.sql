BEGIN;

INSERT INTO users (name, email, phone, password) VALUES (
    'aya', 'aya@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'khaled', 'khaled@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'amal', 'amal@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'nada', 'nada@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'mohammad', 'mohammad@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'karam', 'karam@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'lina', 'lina@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'eman', 'eman@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'ahmad', 'ahmad@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'nour', 'nour@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO users (name, email, phone, password) VALUES (
    'abdullah', 'abdullah@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);
INSERT INTO projects (title, description) VALUES (
    'PROJECT1 ', 'this is my first project description'
);
INSERT INTO projects (title, description) VALUES (
    'PROJECT2', 'this is my first project description'
);
INSERT INTO projects (title, description) VALUES (
    'PROJECT3', 'this is my first project description'
);
INSERT INTO projects (title, description) VALUES (
    'PROJECT4', 'this is my first project description'
);
INSERT INTO projects (title, description) VALUES (
    'PROJECT5', 'this is my first project description'
);INSERT INTO projects (title, description) VALUES (
    'PROJECT6', 'this is my first project description'
);INSERT INTO projects (title, description) VALUES (
    'PROJECT7', 'this is my first project description'
);INSERT INTO projects (title, description) VALUES (
    'PROJECT8', 'this is my first project description'
);INSERT INTO projects (title, description) VALUES (
    'PROJECT9', 'this is my first project description'
);

INSERT INTO roles (role) VALUES ('manager'), ('member');
INSERT INTO priorities (priority, color) VALUES 
('high', '#F8524B'),
('medium', '#FF8800'),
('low', '#06C270');
INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    2, 2, 2
);
INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    3, 2, 2
);
INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    4, 2, 2
);
INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    5, 2, 2
);
INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    6, 2, 2
);
INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    7, 2, 2
);
INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    3, 2, 1
);
INSERT INTO sections (section) VALUES ('To-Do'), ('Doing'), ('Reviewing'), ('Done');
INSERT INTO tasks (title,description,created_at,due_date,user_id,project_id,priority_id,section_id) VALUES 
('add query tasks', 'add tasks', '2023-07-2', '2023-07-2',3,2,1,1);
INSERT INTO tasks (title,description,created_at,due_date,user_id,project_id,priority_id,section_id) VALUES 
('add controller tasks', 'add tasks', '2023-07-2', '2023-07-2',4,2,1,1);
INSERT INTO tasks (title,description,created_at,due_date,user_id,project_id,priority_id,section_id) VALUES 
('add connection tasks', 'add tasks', '2023-07-2', '2023-07-2',5,2,1,1);
INSERT INTO tasks (title,description,created_at,due_date,user_id,project_id,priority_id,section_id) VALUES 
('add get tasks query', 'add tasks', '2023-07-2', '2023-07-2',6,2,1,1);
INSERT INTO tasks (title,description,created_at,due_date,user_id,project_id,priority_id,section_id) VALUES 
('add post tasks query', 'add tasks', '2023-07-2', '2023-07-2',7,2,1,1);
INSERT INTO tasks (title, description, due_date, user_id, priority_id, section_id, project_id) VALUES (
    'FIRST-TASK', 'my first task description', '2023-07-2', 4, 1, 1,4
);
INSERT INTO attachments (attach_s3, user_id, task_id) VALUES (
    'xxxxxxx', 1, 1
);

COMMIT;
