const { createClient } = require('D:/File Penting/File S2/Thesis Project/Data in game Relasi dan Fungsi/node_modules/@libsql/client');

async function syncDb() {
  const dbPath = 'D:/File Penting/File S2/Thesis Project/Data in game Relasi dan Fungsi/detektif_data.db';
  const c = createClient({ url: 'file:' + dbPath });

  // Ensure quest_scores table exists
  await c.execute(`
    CREATE TABLE IF NOT EXISTS quest_scores (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      subbab_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      total_questions INTEGER NOT NULL DEFAULT 30,
      points_earned INTEGER NOT NULL,
      time_remaining_seconds INTEGER NOT NULL DEFAULT 0,
      completed_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      UNIQUE(user_id, subbab_id)
    )
  `);

  // Fetch all users
  const users = await c.execute('SELECT id, name, username FROM user');
  console.log('Found users:', users.rows.map(u => u.username));

  const now = Date.now();

  for (const u of users.rows) {
    const userId = u.id;
    const isFikran02 = u.username.toLowerCase() === 'fikran02';
    const isFikranArsyad = u.username.toLowerCase() === 'fikranarsyad';

    const totalScore = isFikran02 ? 370 : (isFikranArsyad ? 1200 : 0);
    const endlessScore = isFikranArsyad ? 450 : 0;

    // user_stats
    await c.execute({
      sql: 'INSERT INTO user_stats (id, total_score, endless_high_score, created_at, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET total_score = excluded.total_score, endless_high_score = excluded.endless_high_score',
      args: [userId, totalScore, endlessScore, now, now]
    });

    // subbab progress (1-7)
    for (let subId = 1; subId <= 7; subId++) {
      let unlocked = subId === 1 ? 1 : 0;
      let currentStage = 1;
      let stars = '{}';

      if (isFikran02 && subId === 1) {
        currentStage = 3;
        stars = JSON.stringify({ '1': 3, '2': 3 });
      } else if (isFikranArsyad) {
        if (subId <= 2) {
          unlocked = 1;
          currentStage = subId === 1 ? 21 : 5;
          const starsObj = {};
          for (let s = 1; s <= (subId === 1 ? 21 : 4); s++) starsObj[s] = 3;
          stars = JSON.stringify(starsObj);
        }
      }

      const id = userId + '_subbab' + subId;
      await c.execute({
        sql: 'INSERT INTO user_subbab_progress (id, user_id, subbab_id, unlocked, current_stage, stars, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(user_id, subbab_id) DO UPDATE SET current_stage = excluded.current_stage, stars = excluded.stars, unlocked = excluded.unlocked',
        args: [id, userId, subId, unlocked, currentStage, stars, now, now]
      });
    }

    // Default badge
    await c.execute({
      sql: 'INSERT INTO user_badges (id, user_id, badge_id, unlocked_at) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, badge_id) DO NOTHING',
      args: [userId + '_badge1', userId, 'badge1', now]
    });

    // If Fikran Arsyad completed Bab 1, add sample quest score for Bab 1
    if (isFikranArsyad) {
      await c.execute({
        sql: 'INSERT INTO quest_scores (id, user_id, subbab_id, score, correct_count, total_questions, points_earned, time_remaining_seconds, completed_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(user_id, subbab_id) DO NOTHING',
        args: [userId + '_quest_1', userId, 1, 93, 28, 30, 2450, 420, now, now]
      });
    }
  }

  console.log('Sync complete!');
}

syncDb().catch(console.error);
