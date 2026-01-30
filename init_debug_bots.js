// ====================================
// INITIALIZE DEBUG BOTS FOR LEADERBOARD
// ====================================

// Run this once to populate the leaderboard with 20 bot users for debugging

function initializeDebugBots() {
    const botNames = [
        { display: "NeonBlaze", username: "@neonblaze", score: 9850, accuracy: 98 },
        { display: "RhythmKing", username: "@rhythmking", score: 9720, accuracy: 97 },
        { display: "BeatMaster3000", username: "@beatmaster3000", score: 9580, accuracy: 96 },
        { display: "CyberDancer", username: "@cyberdancer", score: 9450, accuracy: 95 },
        { display: "SynthWave", username: "@synthwave", score: 9320, accuracy: 94 },
        { display: "VaporGroove", username: "@vaporgroove", score: 9180, accuracy: 93 },
        { display: "ElectroNinja", username: "@electroninja", score: 9050, accuracy: 92 },
        { display: "PixelPerfect", username: "@pixelperfect", score: 8920, accuracy: 91 },
        { display: "NightRunner", username: "@nightrunner", score: 8790, accuracy: 90 },
        { display: "LaserLegend", username: "@laserlegend", score: 8660, accuracy: 89 },
        { display: "ChromaticKid", username: "@chromatickid", score: 8530, accuracy: 88 },
        { display: "TurboTapper", username: "@turbotapper", score: 8400, accuracy: 87 },
        { display: "RetroVibes", username: "@retrovibes", score: 8270, accuracy: 86 },
        { display: "StarGazer", username: "@stargazer", score: 8140, accuracy: 85 },
        { display: "FluxCapacitor", username: "@fluxcapacitor", score: 8010, accuracy: 84 },
        { display: "NovaBlast", username: "@novablast", score: 7880, accuracy: 83 },
        { display: "OrbitGuru", username: "@orbitguru", score: 7750, accuracy: 82 },
        { display: "PulseDemon", username: "@pulsedemon", score: 7620, accuracy: 81 },
        { display: "QuantumBeat", username: "@quantumbeat", score: 7490, accuracy: 80 },
        { display: "ZeroGravity", username: "@zerogravity", score: 7360, accuracy: 79 }
    ];

    const bots = botNames.map((bot, index) => ({
        displayName: bot.display,
        username: bot.username,
        email: `${bot.username.substring(1)}@bot.muzicmania.game`,
        password: 'bot_password_123',
        highScore: bot.score,
        accuracy: bot.accuracy,
        gamesPlayed: Math.floor(Math.random() * 200) + 50, // Entre 50 y 250 partidas
        createdAt: new Date(Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(), // Últimos 30 días
        lastUsernameChange: new Date(Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        isBot: true
    }));

    // Obtener usuarios actuales (por si hay usuarios reales)
    const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Filtrar bots existentes para no duplicar
    const realUsers = currentUsers.filter(u => !u.isBot);
    
    // Combinar usuarios reales con nuevos bots
    const updatedUsers = [...realUsers, ...bots];
    
    // Guardar en localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Actualizar leaderboard
    const leaderboard = updatedUsers
        .filter(u => u.highScore > 0)
        .sort((a, b) => b.highScore - a.highScore);
    
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
    console.log('✅ Debug bots initialized successfully!');
    console.log(`📊 Total users: ${updatedUsers.length}`);
    console.log(`🤖 Bots: ${bots.length}`);
    console.log(`👤 Real users: ${realUsers.length}`);
    console.log(`🏆 Leaderboard entries: ${leaderboard.length}`);
    
    return {
        total: updatedUsers.length,
        bots: bots.length,
        real: realUsers.length,
        leaderboard: leaderboard.length
    };
}

// Auto-ejecutar si llamamos directamente
if (typeof window !== 'undefined' && !localStorage.getItem('debugBotsInitialized')) {
    const result = initializeDebugBots();
    localStorage.setItem('debugBotsInitialized', 'true');
    alert(`🎮 MuzicMania Debug Bots Initialized!\n\n` +
          `✅ ${result.bots} bots added\n` +
          `👤 ${result.real} real users preserved\n` +
          `🏆 ${result.leaderboard} total leaderboard entries\n\n` +
          `Refresh the page to see the results!`);
}

// Exportar para uso manual
if (typeof window !== 'undefined') {
    window.initializeDebugBots = initializeDebugBots;
}
