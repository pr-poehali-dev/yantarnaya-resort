CREATE TABLE t_p4562151_yantarnaya_resort.leads (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    phone       TEXT NOT NULL,
    channel     TEXT NOT NULL DEFAULT 'site',
    message     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);