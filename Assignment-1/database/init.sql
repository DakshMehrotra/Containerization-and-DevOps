-- Create tasks table

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,

    priority TEXT DEFAULT 'medium'
        CHECK (priority IN ('low','medium','high')),

    status TEXT DEFAULT 'todo'
        CHECK (status IN ('todo','in_progress','done')),

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster search queries
CREATE INDEX IF NOT EXISTS idx_tasks_title
ON tasks USING gin (to_tsvector('english', title));