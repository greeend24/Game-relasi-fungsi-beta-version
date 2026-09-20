const path = require('path');
const { createClient } = require(path.resolve(__dirname, '../backend/node_modules/@libsql/client'));

async function check(name, p) {
  try {
    const c = createClient({ url: 'file:' + p.replace(/\\/g, '/') });
    const tables = await c.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log(`=== Tables in ${name} ===`, tables.rows.map(r => r.name));
    for (const t of ['user', 'account', 'user_stats']) {
      try {
        const info = await c.execute(`PRAGMA table_info(${t})`);
        console.log(`Columns in ${t}:`, info.rows.map(r => r.name));
        const data = await c.execute(`SELECT * FROM ${t}`);
        console.log(`Rows in ${t} (${data.rows.length}):`);
        data.rows.forEach(r => console.log(' ', r));
      } catch (err) {
        console.error(`Error querying ${t}:`, err.message);
      }
    }
  } catch(e) {
    console.error('Err ' + name + ':', e.message);
  }
}

async function run() {
  await check('ADMIN SERVER DB (backend/detektif_data.db)', 'D:/File Penting/File S2/Thesis Project/Game-Relasi-Fungsi/backend/detektif_data.db');
  console.log('\n========================================\n');
  await check('ELECTRON APPDATA DB (AppData/detektif_data.db)', 'C:/Users/GreeND24/AppData/Roaming/detektif-data-relasi-fungsi/detektif_data.db');
}
run();
