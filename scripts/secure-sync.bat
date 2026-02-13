@echo off
echo --- Registrando Sincronización --- > git_deploy.log
echo 1. Limpiando remotos de push >> git_deploy.log
git remote set-url --delete --push origin ".*" 2>> git_deploy.log

echo 2. Configurando Multirepo (GitHub, GitLab, Bitbucket) >> git_deploy.log
git remote set-url --add --push origin "https://github.com/CiszukoAntony/MuzicMania" >> git_deploy.log
git remote set-url --add --push origin "https://gitlab.com/ciszu-network/MuzicMania" >> git_deploy.log
git remote set-url --add --push origin "https://bitbucket.org/ciszu-network/muzicmania" >> git_deploy.log

echo 3. Preparando commit >> git_deploy.log
git add . >> git_deploy.log
git commit -m "FIX: Production redeploy - ESLint v9 Flat Config and Multi-Repo Sync" >> git_deploy.log

echo 4. Ejecutando Push Forzado >> git_deploy.log
git push origin main --force >> git_deploy.log 2>&1

echo 5. Verificando Remotos >> git_deploy.log
git remote -v >> git_deploy.log

echo 6. Verificando Log >> git_deploy.log
git log -n 1 >> git_deploy.log

echo --- FIN --- >> git_deploy.log
