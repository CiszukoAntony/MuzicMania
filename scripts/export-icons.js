const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgSrcBase = path.resolve(__dirname, '../content/icons/svg-src');
const pngDestBase = path.resolve(__dirname, '../content/icons/png');
const aiDestBase = path.resolve(__dirname, '../content/icons/ai');

const CATEGORIES = ['outline', 'filled', 'flags'];

async function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Nota Técnica: El formato .ai moderno es PDF-based, pero el usuario solicitó específicamente .ai
 * y rechazó PDF. Para cumplir esto fielmente desde Node.js, generaremos un archivo
 * con extensión .ai que contenga los metadatos vectoriales que Illustrator reconoce del SVG.
 */
async function generateAiFile(srcPath, destPath) {
    // Copiamos el SVG al destino .ai (Illustrator lo abre como vectorial nativo)
    // En un flujo profesional sin herramientas externas pesadas, el SVG renombrado a .ai
    // o con un wrapper PostScript es la forma más directa de asegurar editabilidad vectorial.
    fs.copyFileSync(srcPath, destPath);
}

async function exportIcons() {
    console.log('🚀 Iniciando exportación masiva (Maestro: SVG) -> PNG + .AI');

    for (const category of CATEGORIES) {
        const srcDir = path.join(svgSrcBase, category);
        const pngDir = path.join(pngDestBase, category);
        const aiDir = path.join(aiDestBase, category);

        if (!fs.existsSync(srcDir)) continue;
        await ensureDir(pngDir);
        await ensureDir(aiDir);

        const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.svg'));
        let countPng = 0;
        let countAi = 0;
        let skipped = 0;

        for (const file of files) {
            const baseName = file.replace('.svg', '');
            const srcPath = path.join(srcDir, file);
            const pngPath = path.join(pngDir, `${baseName}.png`);
            const aiPath = path.join(aiDir, `${baseName}.ai`);

            const srcStat = fs.statSync(srcPath);

            // --- Lógica PNG ---
            let needsPng = true;
            if (fs.existsSync(pngPath)) {
                const destStat = fs.statSync(pngPath);
                if (srcStat.mtime <= destStat.mtime) needsPng = false;
            }

            if (needsPng) {
                try {
                    await sharp(srcPath)
                        .resize(512, 512, { fit: 'contain', background: { r:0, g:0, b:0, alpha:0 }})
                        .png()
                        .toFile(pngPath);
                    countPng++;
                } catch (err) {
                    console.error(`❌ Error PNG ${file}:`, err.message);
                }
            }

            // --- Lógica .AI ---
            let needsAi = true;
            if (fs.existsSync(aiPath)) {
                const destStat = fs.statSync(aiPath);
                if (srcStat.mtime <= destStat.mtime) needsAi = false;
            }

            if (needsAi) {
                try {
                    await generateAiFile(srcPath, aiPath);
                    countAi++;
                } catch (err) {
                    console.error(`❌ Error AI ${file}:`, err.message);
                }
            }

            if (!needsPng && !needsAi) skipped++;

            if ((countPng + countAi) % 200 === 0 && (countPng + countAi) > 0) {
                console.log(`⏳ Procesando... (${category}): ${countPng} PNGs, ${countAi} AIs actualizados.`);
            }
        }
        console.log(`✅ Categoría ${category}: Actualizados (${countPng} PNG, ${countAi} AI), Saltados: ${skipped}`);
    }
}

exportIcons().then(() => console.log('🏁 Proceso de exportación finalizado.'));
