DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS calendar;
DROP TABLE IF EXISTS usercount;
DROP TABLE IF EXISTS requestcount;

CREATE TABLE tasks (
    task_id int,
    task_title TEXT,
    task_description TEXT,
    task_category TEXT
);

CREATE TABLE calendar (
    event_id int,
    event_time_ms int,
    event_title TEXT,
    event_description TEXT
);

CREATE TABLE usercount (
    created_users int,
    online_users int
);

CREATE TABLE requestcount (
    requestcount int
);