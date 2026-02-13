const { execSync } = require('child_process');

const remotes = [
    'https://gitlab.com/ciszu-network/MuzicMania',
    'https://bitbucket.org/ciszu-network/muzicmania',
];

try {
    console.log('--- Configurando Remotos ---');
    remotes.forEach((url) => {
        try {
            execSync(`git remote set-url --add --push origin "${url}"`);
            console.log(`✅ Agregado: ${url}`);
        } catch (e) {
            console.error(`❌ Error al agregar ${url}:`, e.message);
        }
    });
    console.log('\n--- Estado de Remotos ---');
    console.log(execSync('git remote -v').toString());
} catch (err) {
    console.error('CRITICAL ERROR:', err.message);
    process.exit(1);
}
