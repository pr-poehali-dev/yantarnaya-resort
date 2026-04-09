import json
import os
import smtplib
from email.mime.text import MIMEText

import psycopg2

SMTP_HOST = "smtp.yandex.ru"
SMTP_PORT = 465
EMAIL_FROM = "b.yantarnaya@yandex.ru"
EMAIL_TO   = "b.yantarnaya@yandex.ru"


def send_email(name: str, phone: str, message: str | None, lead_id: int) -> None:
    body = f"""Новая заявка с сайта «Янтарная» #{lead_id}

Имя:     {name}
Телефон: {phone}
Сообщение: {message or '—'}

Ответьте как можно скорее!
"""
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = f"Заявка с сайта — {name}"
    msg["From"]    = EMAIL_FROM
    msg["To"]      = EMAIL_TO

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as smtp:
        smtp.login(EMAIL_FROM, os.environ["SMTP_PASSWORD"])
        smtp.sendmail(EMAIL_FROM, EMAIL_TO, msg.as_string())


def handler(event: dict, context) -> dict:
    """Сохраняет заявку в БД и отправляет уведомление на почту b.yantarnaya@yandex.ru."""

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

    send_email(name, phone, message, row[0])

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps(
            {"ok": True, "id": row[0], "created_at": str(row[1])},
            ensure_ascii=False,
        ),
    }