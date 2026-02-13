@echo off
echo --- Sincronizando GitHub, GitLab y Bitbucket ---
git remote set-url --add --push origin "https://gitlab.com/ciszu-network/MuzicMania"
git remote set-url --add --push origin "https://bitbucket.org/ciszu-network/muzicmania"
git add .
git commit -m "FIX: Private docs reorganization and ESLint v9 multi-repo sync"
git push origin main --force
echo ✅ Sincronización Completa
