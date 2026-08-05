# 開發環境

- **Node.js**：由 nvm 管理（`~/.nvm/nvm.sh`），目前安裝 v22.18.0。需要不同版本時用 `nvm install <ver>` / `nvm use <ver>`。
- **Python**：由 uv 管理（`~/.local/bin/uv`，v0.12.1）。建立環境用 `uv venv`、裝依賴用 `uv add`/`uv pip install`、跑腳本用 `uv run`，不需要系統 Python。
