const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'deploy_report.txt');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

try {
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
    log('--- DEPLOY ORCHESTRATOR START ---');

    // 1. Cleanup old ESLint
    const oldConfig = path.join(__dirname, '..', '.eslintrc.js');
    if (fs.existsSync(oldConfig)) {
        fs.unlinkSync(oldConfig);
        log('✅ Removed old .eslintrc.js');
    }

    // 2. Configure Remotes
    log('Configuring remotes...');
    execSync('git remote set-url --push origin "https://github.com/CiszukoAntony/MuzicMania"', {
        stdio: 'inherit',
    });
    execSync(
        'git remote set-url --add --push origin "https://gitlab.com/ciszu-network/MuzicMania"',
        { stdio: 'inherit' }
    );
    execSync(
        'git remote set-url --add --push origin "https://bitbucket.org/ciszu-network/muzicmania"',
        { stdio: 'inherit' }
    );
    log('✅ Remotes configured');

    // 3. Commit
    log('Committing changes...');
    execSync('git add .', { stdio: 'inherit' });
    try {
        execSync(
            'git commit -m "FIX: Final production redeploy - ESLint v9 and Vercel module fixes"',
            { stdio: 'inherit' }
        );
        log('✅ Committed');
    } catch (e) {
        log('⚠️ Nothing to commit or commit failed');
    }

    // 4. Push to all
    log('Pushing to GitHub (main)...');
    execSync('git push origin main --force', { stdio: 'inherit' });
    log('✅ Pushed to GitHub');

    log('--- DEPLOY ORCHESTRATOR SUCCESS ---');
} catch (error) {
    log('❌ DEPLOY FAILED');
    log('Error: ' + error.message);
    if (error.stderr) log('Stderr: ' + error.stderr.toString());
    process.exit(1);
}
