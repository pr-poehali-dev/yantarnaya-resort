import json
import os

import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет заявку клиента (имя, телефон, канал, сообщение) в таблицу leads."""

    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name    = (body.get("name") or "").strip()
    phone   = (body.get("phone") or "").strip()
    channel = (body.get("channel") or "site").strip()
    message = (body.get("message") or "").strip() or None

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors,
            "body": json.dumps({"error": "name и phone обязательны"}, ensure_ascii=False),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p4562151_yantarnaya_resort.leads (name, phone, channel, message) "
        "VALUES (%s, %s, %s, %s) RETURNING id, created_at",
        (name, phone, channel, message),
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps(
            {"ok": True, "id": row[0], "created_at": str(row[1])},
            ensure_ascii=False,
        ),
    }
