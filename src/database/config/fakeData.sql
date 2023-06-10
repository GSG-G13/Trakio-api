BEGIN;

INSERT INTO users (name, email, phone, password) VALUES (
    'admin', 'admin@gmail.com', '0599111111', '$2a$10$iDHXruvT1m0PNa1r13sIf.QHj7jz226dmH5cBxWkn7WnnWApzvum2'
);

INSERT INTO projects (title, description) VALUES (
    'FIRST-PROJECT', 'this is my first project description'
);

INSERT INTO roles (role) VALUES ('manager'), ('member');

INSERT INTO project_users (user_id, project_id, role_id) VALUES (
    1, 1, 1
);

INSERT INTO priorities (priority, color) VALUES 
('hight', '#F8524B'),
('medium', '#FF8800'),
('low', '#06C270')
;

INSERT INTO sections (section) VALUES ('To-Do'), ('Doing'), ('Reviewing'), ('Done');

INSERT INTO tasks (title, description, due_date, user_id, priority_id, section_id) VALUES (
    'FIRST-TASK', 'my first task description', '2023-07-2', 1, 1, 1
);



INSERT INTO attachments (attach_s3, user_id, task_id) VALUES (
    'xxxxxxx', 1, 1
);

COMMIT;