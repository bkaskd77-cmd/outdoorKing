FROM python:3.14-slim-bookworm
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY pyproject.toml README.md ./
COPY src ./src
RUN pip install --no-cache-dir .
RUN adduser --disabled-password --gecos "" intel
USER intel
EXPOSE 8100
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8100/health')" || exit 1
CMD ["uvicorn", "ok_intel.main:app", "--host", "0.0.0.0", "--port", "8100"]
