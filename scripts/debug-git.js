const { execSync } = require('child_process');

try {
    console.log('--- Git Diagnostic Start ---');

    console.log('1. Git Config (origin):');
    console.log(execSync('git remote get-url origin').toString());

    console.log('\n2. Git Branches:');
    console.log(execSync('git branch').toString());

    console.log('\n3. Git Status:');
    console.log(execSync('git status').toString());

    console.log('\n4. Attempting Push force to main:');
    const pushResult = execSync('git push origin main --force', { stdio: 'pipe' }).toString();
    console.log('Push Result:', pushResult);

    console.log('\n5. Last Commit Log:');
    console.log(execSync('git log -n 1').toString());

    console.log('--- Git Diagnostic End ---');
} catch (error) {
    console.error('--- DIAGNOSTIC ERROR ---');
    console.error('Message:', error.message);
    if (error.stdout) console.error('Stdout:', error.stdout.toString());
    if (error.stderr) console.error('Stderr:', error.stderr.toString());
    process.exit(1);
}
