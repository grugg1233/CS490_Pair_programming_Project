FROM python:3.12-slim

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY pyproject.toml uv.lock ./

RUN uv sync

ENV PATH="/app/.venv/bin:$PATH"

COPY app ./app

COPY gunicorn_config.py .

EXPOSE 8000

CMD ["gunicorn", "--config", "gunicorn_config.py", "app.main:app"]
