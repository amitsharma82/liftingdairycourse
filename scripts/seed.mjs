import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_lr2GmWZ3zobY@ep-square-queen-abpzfe77-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const sql = neon(DATABASE_URL);
const USER_ID = 'user_3CJbnOaGOIeDwOjRNIuVMZksvRo';

// Fixed UUIDs so foreign keys resolve correctly
const IDS = {
  // exercises
  ex001: 'a1000000-0000-0000-0000-000000000001',
  ex002: 'a1000000-0000-0000-0000-000000000002',
  ex003: 'a1000000-0000-0000-0000-000000000003',
  ex004: 'a1000000-0000-0000-0000-000000000004',
  ex005: 'a1000000-0000-0000-0000-000000000005',
  ex006: 'a1000000-0000-0000-0000-000000000006',
  ex007: 'a1000000-0000-0000-0000-000000000007',
  ex008: 'a1000000-0000-0000-0000-000000000008',
  // program
  prog001: 'b1000000-0000-0000-0000-000000000001',
  // program_workouts
  pw001: 'c1000000-0000-0000-0000-000000000001',
  pw002: 'c1000000-0000-0000-0000-000000000002',
  pw003: 'c1000000-0000-0000-0000-000000000003',
  pw004: 'c1000000-0000-0000-0000-000000000004',
  pw005: 'c1000000-0000-0000-0000-000000000005',
  pw006: 'c1000000-0000-0000-0000-000000000006',
  // program_workout_exercises
  pwe001: 'd1000000-0000-0000-0000-000000000001',
  pwe002: 'd1000000-0000-0000-0000-000000000002',
  pwe003: 'd1000000-0000-0000-0000-000000000003',
  pwe004: 'd1000000-0000-0000-0000-000000000004',
  pwe005: 'd1000000-0000-0000-0000-000000000005',
  pwe006: 'd1000000-0000-0000-0000-000000000006',
  pwe007: 'd1000000-0000-0000-0000-000000000007',
  pwe008: 'd1000000-0000-0000-0000-000000000008',
  // workouts
  w001: 'e1000000-0000-0000-0000-000000000001',
  w002: 'e1000000-0000-0000-0000-000000000002',
  w003: 'e1000000-0000-0000-0000-000000000003',
  w004: 'e1000000-0000-0000-0000-000000000004',
  w005: 'e1000000-0000-0000-0000-000000000005',
  w006: 'e1000000-0000-0000-0000-000000000006',
  // workout_exercises
  we001: 'f1000000-0000-0000-0000-000000000001',
  we002: 'f1000000-0000-0000-0000-000000000002',
  we003: 'f1000000-0000-0000-0000-000000000003',
  we004: 'f1000000-0000-0000-0000-000000000004',
  we005: 'f1000000-0000-0000-0000-000000000005',
  we006: 'f1000000-0000-0000-0000-000000000006',
  we007: 'f1000000-0000-0000-0000-000000000007',
  we008: 'f1000000-0000-0000-0000-000000000008',
  we009: 'f1000000-0000-0000-0000-000000000009',
  we010: 'f1000000-0000-0000-0000-000000000010',
  we011: 'f1000000-0000-0000-0000-000000000011',
  we012: 'f1000000-0000-0000-0000-000000000012',
  we013: 'f1000000-0000-0000-0000-000000000013',
  we014: 'f1000000-0000-0000-0000-000000000014',
  we015: 'f1000000-0000-0000-0000-000000000015',
  we016: 'f1000000-0000-0000-0000-000000000016',
};

async function seed() {
  console.log('Seeding exercises...');
  await sql`
    INSERT INTO exercises (id, name, category, muscle_group, created_by, created_at) VALUES
      (${IDS.ex001}, 'Barbell Back Squat',  'strength',   'legs',      ${USER_ID}, '2026-03-01 10:00:00'),
      (${IDS.ex002}, 'Barbell Bench Press', 'strength',   'chest',     ${USER_ID}, '2026-03-01 10:00:00'),
      (${IDS.ex003}, 'Deadlift',            'strength',   'back',      ${USER_ID}, '2026-03-01 10:00:00'),
      (${IDS.ex004}, 'Overhead Press',      'strength',   'shoulders', ${USER_ID}, '2026-03-01 10:00:00'),
      (${IDS.ex005}, 'Barbell Row',         'strength',   'back',      ${USER_ID}, '2026-03-01 10:00:00'),
      (${IDS.ex006}, 'Pull-Up',             'bodyweight', 'back',      ${USER_ID}, '2026-03-01 10:00:00'),
      (${IDS.ex007}, 'Dumbbell Curl',       'strength',   'biceps',    ${USER_ID}, '2026-03-01 10:00:00'),
      (${IDS.ex008}, 'Tricep Pushdown',     'strength',   'triceps',   ${USER_ID}, '2026-03-01 10:00:00')
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ 8 exercises');

  console.log('Seeding programs...');
  await sql`
    INSERT INTO programs (id, user_id, name, description, total_weeks, created_at) VALUES
      (${IDS.prog001}, ${USER_ID}, '5-Day Powerbuilding',
       'Hybrid strength + hypertrophy. Big 3 + accessory work.', 8, '2026-03-01 10:00:00')
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ 1 program');

  console.log('Seeding program_workouts...');
  await sql`
    INSERT INTO program_workouts (id, program_id, week_number, day_number, name, notes) VALUES
      (${IDS.pw001}, ${IDS.prog001}, 1, 1, 'Push Day — Chest & Shoulders', 'Focus on bar path'),
      (${IDS.pw002}, ${IDS.prog001}, 1, 2, 'Pull Day — Back & Biceps',     'Control the negative'),
      (${IDS.pw003}, ${IDS.prog001}, 1, 3, 'Leg Day',                      'Drive through the heels'),
      (${IDS.pw004}, ${IDS.prog001}, 2, 1, 'Push Day — Chest & Shoulders', 'Increase bench by 2.5kg'),
      (${IDS.pw005}, ${IDS.prog001}, 2, 2, 'Pull Day — Back & Biceps',     'Add 1 pull-up rep per set'),
      (${IDS.pw006}, ${IDS.prog001}, 2, 3, 'Leg Day',                      'Chase the squat PR')
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ 6 program_workouts');

  console.log('Seeding program_workout_exercises...');
  await sql`
    INSERT INTO program_workout_exercises (id, program_workout_id, exercise_id, order_index, target_sets, target_reps, target_weight, notes) VALUES
      (${IDS.pwe001}, ${IDS.pw001}, ${IDS.ex002}, 1, 4,    5,  80,   'Touch and go'),
      (${IDS.pwe002}, ${IDS.pw001}, ${IDS.ex004}, 2, 3,    8,  50,   NULL),
      (${IDS.pwe003}, ${IDS.pw001}, ${IDS.ex008}, 3, 3,    12, 25,   NULL),
      (${IDS.pwe004}, ${IDS.pw002}, ${IDS.ex005}, 1, 4,    6,  70,   'Elbows tight'),
      (${IDS.pwe005}, ${IDS.pw002}, ${IDS.ex006}, 2, 3,    8,  NULL, 'Bodyweight'),
      (${IDS.pwe006}, ${IDS.pw002}, ${IDS.ex007}, 3, 3,    12, 15,   NULL),
      (${IDS.pwe007}, ${IDS.pw003}, ${IDS.ex001}, 1, 4,    5,  100,  'Belt on top sets'),
      (${IDS.pwe008}, ${IDS.pw003}, ${IDS.ex003}, 2, 3,    5,  120,  NULL)
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ 8 program_workout_exercises');

  console.log('Seeding workouts...');
  await sql`
    INSERT INTO workouts (id, user_id, program_workout_id, name, started_at, ended_at, notes) VALUES
      (${IDS.w001}, ${USER_ID}, ${IDS.pw001}, 'Push Day — Chest & Shoulders', '2026-03-03 09:00:00', '2026-03-03 09:55:00', 'Felt strong today'),
      (${IDS.w002}, ${USER_ID}, ${IDS.pw002}, 'Pull Day — Back & Biceps',     '2026-03-05 08:30:00', '2026-03-05 09:20:00', 'Pull-ups felt hard'),
      (${IDS.w003}, ${USER_ID}, ${IDS.pw003}, 'Leg Day',                      '2026-03-07 10:00:00', '2026-03-07 11:10:00', 'New squat PR — 110kg'),
      (${IDS.w004}, ${USER_ID}, ${IDS.pw004}, 'Push Day — Chest & Shoulders', '2026-03-10 09:00:00', '2026-03-10 10:00:00', 'Bench moving well'),
      (${IDS.w005}, ${USER_ID}, ${IDS.pw005}, 'Pull Day — Back & Biceps',     '2026-03-12 08:30:00', '2026-03-12 09:25:00', 'Rows felt solid'),
      (${IDS.w006}, ${USER_ID}, ${IDS.pw006}, 'Leg Day',                      '2026-03-14 10:00:00', '2026-03-14 11:15:00', 'Quads were on fire')
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ 6 workouts');

  console.log('Seeding workout_exercises...');
  await sql`
    INSERT INTO workout_exercises (id, workout_id, exercise_id, order_index, notes) VALUES
      (${IDS.we001}, ${IDS.w001}, ${IDS.ex002}, 1, NULL),
      (${IDS.we002}, ${IDS.w001}, ${IDS.ex004}, 2, NULL),
      (${IDS.we003}, ${IDS.w001}, ${IDS.ex008}, 3, NULL),
      (${IDS.we004}, ${IDS.w002}, ${IDS.ex005}, 1, NULL),
      (${IDS.we005}, ${IDS.w002}, ${IDS.ex006}, 2, 'Struggled on rep 7'),
      (${IDS.we006}, ${IDS.w002}, ${IDS.ex007}, 3, NULL),
      (${IDS.we007}, ${IDS.w003}, ${IDS.ex001}, 1, NULL),
      (${IDS.we008}, ${IDS.w003}, ${IDS.ex003}, 2, NULL),
      (${IDS.we009}, ${IDS.w004}, ${IDS.ex002}, 1, NULL),
      (${IDS.we010}, ${IDS.w004}, ${IDS.ex004}, 2, NULL),
      (${IDS.we011}, ${IDS.w004}, ${IDS.ex008}, 3, NULL),
      (${IDS.we012}, ${IDS.w005}, ${IDS.ex005}, 1, NULL),
      (${IDS.we013}, ${IDS.w005}, ${IDS.ex006}, 2, NULL),
      (${IDS.we014}, ${IDS.w005}, ${IDS.ex007}, 3, NULL),
      (${IDS.we015}, ${IDS.w006}, ${IDS.ex001}, 1, NULL),
      (${IDS.we016}, ${IDS.w006}, ${IDS.ex003}, 2, NULL)
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ 16 workout_exercises');

  console.log('Seeding workout_sets (batch 1/3: w-001 sets)...');
  await sql`
    INSERT INTO workout_sets (id, workout_exercise_id, set_number, weight_kg, reps, rpe, rir, rest_seconds, notes, logged_at) VALUES
      ('a2000000-0000-0000-0000-000000000001', ${IDS.we001}, 1, 70,   5,  6.0, 4, 120, NULL,               '2026-03-03 09:05:00'),
      ('a2000000-0000-0000-0000-000000000002', ${IDS.we001}, 2, 75,   5,  7.0, 3, 150, NULL,               '2026-03-03 09:09:00'),
      ('a2000000-0000-0000-0000-000000000003', ${IDS.we001}, 3, 80,   5,  8.0, 2, 180, NULL,               '2026-03-03 09:14:00'),
      ('a2000000-0000-0000-0000-000000000004', ${IDS.we001}, 4, 80,   5,  8.5, 1, 180, NULL,               '2026-03-03 09:19:00'),
      ('a2000000-0000-0000-0000-000000000005', ${IDS.we002}, 1, 40,   8,  6.0, 4, 90,  NULL,               '2026-03-03 09:28:00'),
      ('a2000000-0000-0000-0000-000000000006', ${IDS.we002}, 2, 47.5, 8,  7.5, 2, 120, NULL,               '2026-03-03 09:32:00'),
      ('a2000000-0000-0000-0000-000000000007', ${IDS.we002}, 3, 50,   7,  8.5, 1, 120, 'Grind on last rep','2026-03-03 09:36:00'),
      ('a2000000-0000-0000-0000-000000000008', ${IDS.we003}, 1, 22.5, 12, 6.0, 5, 60,  NULL,               '2026-03-03 09:44:00'),
      ('a2000000-0000-0000-0000-000000000009', ${IDS.we003}, 2, 25,   12, 7.0, 3, 60,  NULL,               '2026-03-03 09:47:00'),
      ('a2000000-0000-0000-0000-000000000010', ${IDS.we003}, 3, 25,   10, 8.0, 2, 60,  NULL,               '2026-03-03 09:50:00')
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ ws-001–010');

  console.log('Seeding workout_sets (batch 2/3: w-002 & w-003 sets)...');
  await sql`
    INSERT INTO workout_sets (id, workout_exercise_id, set_number, weight_kg, reps, rpe, rir, rest_seconds, notes, logged_at) VALUES
      ('a2000000-0000-0000-0000-000000000011', ${IDS.we004}, 1, 60,   6, 6.5, 3, 120, NULL,                  '2026-03-05 08:35:00'),
      ('a2000000-0000-0000-0000-000000000012', ${IDS.we004}, 2, 65,   6, 7.5, 2, 150, NULL,                  '2026-03-05 08:40:00'),
      ('a2000000-0000-0000-0000-000000000013', ${IDS.we004}, 3, 70,   6, 8.5, 1, 150, NULL,                  '2026-03-05 08:45:00'),
      ('a2000000-0000-0000-0000-000000000014', ${IDS.we004}, 4, 70,   5, 9.0, 1, 180, NULL,                  '2026-03-05 08:51:00'),
      ('a2000000-0000-0000-0000-000000000015', ${IDS.we005}, 1, NULL, 8, 7.0, 3, 90,  'Bodyweight',          '2026-03-05 09:00:00'),
      ('a2000000-0000-0000-0000-000000000016', ${IDS.we005}, 2, NULL, 7, 8.0, 2, 90,  NULL,                  '2026-03-05 09:03:00'),
      ('a2000000-0000-0000-0000-000000000017', ${IDS.we005}, 3, NULL, 6, 9.0, 1, 90,  NULL,                  '2026-03-05 09:06:00'),
      ('a2000000-0000-0000-0000-000000000018', ${IDS.we006}, 1, 12.5, 12, 6.0, 5, 60, NULL,                  '2026-03-05 09:13:00'),
      ('a2000000-0000-0000-0000-000000000019', ${IDS.we006}, 2, 15,   12, 7.0, 3, 60, NULL,                  '2026-03-05 09:16:00'),
      ('a2000000-0000-0000-0000-000000000020', ${IDS.we006}, 3, 15,   10, 8.0, 2, 60, NULL,                  '2026-03-05 09:19:00'),
      ('a2000000-0000-0000-0000-000000000021', ${IDS.we007}, 1, 80,   5, 6.0, 4, 180, NULL,                  '2026-03-07 10:05:00'),
      ('a2000000-0000-0000-0000-000000000022', ${IDS.we007}, 2, 95,   5, 7.5, 3, 180, NULL,                  '2026-03-07 10:11:00'),
      ('a2000000-0000-0000-0000-000000000023', ${IDS.we007}, 3, 105,  5, 8.5, 2, 240, NULL,                  '2026-03-07 10:18:00'),
      ('a2000000-0000-0000-0000-000000000024', ${IDS.we007}, 4, 110,  4, 9.5, 0, 240, 'New PR!',             '2026-03-07 10:26:00'),
      ('a2000000-0000-0000-0000-000000000025', ${IDS.we008}, 1, 100,  5, 7.0, 3, 180, NULL,                  '2026-03-07 10:48:00'),
      ('a2000000-0000-0000-0000-000000000026', ${IDS.we008}, 2, 115,  5, 8.0, 2, 210, NULL,                  '2026-03-07 10:54:00'),
      ('a2000000-0000-0000-0000-000000000027', ${IDS.we008}, 3, 120,  5, 8.5, 1, 210, NULL,                  '2026-03-07 11:01:00')
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ ws-011–027');

  console.log('Seeding workout_sets (batch 3/3: w-004, w-005, w-006 sets)...');
  await sql`
    INSERT INTO workout_sets (id, workout_exercise_id, set_number, weight_kg, reps, rpe, rir, rest_seconds, notes, logged_at) VALUES
      ('a2000000-0000-0000-0000-000000000028', ${IDS.we009}, 1, 75,    5, 6.5, 3, 150, NULL,                    '2026-03-10 09:05:00'),
      ('a2000000-0000-0000-0000-000000000029', ${IDS.we009}, 2, 80,    5, 7.5, 2, 180, NULL,                    '2026-03-10 09:10:00'),
      ('a2000000-0000-0000-0000-000000000030', ${IDS.we009}, 3, 82.5,  5, 8.0, 2, 180, NULL,                    '2026-03-10 09:15:00'),
      ('a2000000-0000-0000-0000-000000000031', ${IDS.we009}, 4, 82.5,  5, 8.5, 1, 180, NULL,                    '2026-03-10 09:21:00'),
      ('a2000000-0000-0000-0000-000000000032', ${IDS.we010}, 1, 45,    8, 6.5, 3, 90,  NULL,                    '2026-03-10 09:30:00'),
      ('a2000000-0000-0000-0000-000000000033', ${IDS.we010}, 2, 50,    8, 7.5, 2, 120, NULL,                    '2026-03-10 09:34:00'),
      ('a2000000-0000-0000-0000-000000000034', ${IDS.we010}, 3, 50,    7, 8.5, 1, 120, NULL,                    '2026-03-10 09:38:00'),
      ('a2000000-0000-0000-0000-000000000035', ${IDS.we011}, 1, 25,    12, 6.0, 5, 60, NULL,                    '2026-03-10 09:46:00'),
      ('a2000000-0000-0000-0000-000000000036', ${IDS.we011}, 2, 27.5,  11, 7.5, 2, 60, NULL,                    '2026-03-10 09:49:00'),
      ('a2000000-0000-0000-0000-000000000037', ${IDS.we011}, 3, 27.5,  10, 8.5, 1, 60, NULL,                    '2026-03-10 09:52:00'),
      ('a2000000-0000-0000-0000-000000000038', ${IDS.we012}, 1, 65,    6, 6.5, 3, 120, NULL,                    '2026-03-12 08:35:00'),
      ('a2000000-0000-0000-0000-000000000039', ${IDS.we012}, 2, 70,    6, 7.5, 2, 150, NULL,                    '2026-03-12 08:41:00'),
      ('a2000000-0000-0000-0000-000000000040', ${IDS.we012}, 3, 72.5,  6, 8.0, 2, 150, NULL,                    '2026-03-12 08:47:00'),
      ('a2000000-0000-0000-0000-000000000041', ${IDS.we012}, 4, 72.5,  5, 9.0, 1, 180, NULL,                    '2026-03-12 08:53:00'),
      ('a2000000-0000-0000-0000-000000000042', ${IDS.we013}, 1, NULL,  8, 7.0, 3, 90,  NULL,                    '2026-03-12 09:01:00'),
      ('a2000000-0000-0000-0000-000000000043', ${IDS.we013}, 2, NULL,  8, 7.5, 2, 90,  NULL,                    '2026-03-12 09:05:00'),
      ('a2000000-0000-0000-0000-000000000044', ${IDS.we013}, 3, NULL,  7, 8.5, 1, 90,  '1 more than last week', '2026-03-12 09:08:00'),
      ('a2000000-0000-0000-0000-000000000045', ${IDS.we014}, 1, 15,    12, 6.0, 5, 60, NULL,                    '2026-03-12 09:15:00'),
      ('a2000000-0000-0000-0000-000000000046', ${IDS.we014}, 2, 15,    12, 7.0, 3, 60, NULL,                    '2026-03-12 09:18:00'),
      ('a2000000-0000-0000-0000-000000000047', ${IDS.we014}, 3, 17.5,  10, 8.5, 1, 60, 'Bumped weight',         '2026-03-12 09:21:00'),
      ('a2000000-0000-0000-0000-000000000048', ${IDS.we015}, 1, 85,    5, 6.5, 3, 180, NULL,                    '2026-03-14 10:05:00'),
      ('a2000000-0000-0000-0000-000000000049', ${IDS.we015}, 2, 100,   5, 7.5, 2, 180, NULL,                    '2026-03-14 10:11:00'),
      ('a2000000-0000-0000-0000-000000000050', ${IDS.we015}, 3, 107.5, 5, 8.5, 2, 240, NULL,                    '2026-03-14 10:18:00'),
      ('a2000000-0000-0000-0000-000000000051', ${IDS.we015}, 4, 112.5, 4, 9.0, 1, 240, 'Chasing 115 next week', '2026-03-14 10:26:00'),
      ('a2000000-0000-0000-0000-000000000052', ${IDS.we016}, 1, 105,   5, 7.0, 3, 180, NULL,                    '2026-03-14 10:48:00'),
      ('a2000000-0000-0000-0000-000000000053', ${IDS.we016}, 2, 120,   5, 8.0, 2, 210, NULL,                    '2026-03-14 10:54:00'),
      ('a2000000-0000-0000-0000-000000000054', ${IDS.we016}, 3, 125,   4, 9.0, 1, 210, 'Heavy today',           '2026-03-14 11:01:00')
    ON CONFLICT (id) DO NOTHING
  `;
  console.log('  ✓ ws-028–054');

  console.log('\nAll done! Verifying row counts...');
  const counts = await sql`
    SELECT
      (SELECT COUNT(*) FROM exercises              WHERE created_by = ${USER_ID}) AS exercises,
      (SELECT COUNT(*) FROM programs               WHERE user_id    = ${USER_ID}) AS programs,
      (SELECT COUNT(*) FROM program_workouts       WHERE program_id = ${IDS.prog001}) AS program_workouts,
      (SELECT COUNT(*) FROM program_workout_exercises WHERE program_workout_id IN (
        SELECT id FROM program_workouts WHERE program_id = ${IDS.prog001}
      )) AS program_workout_exercises,
      (SELECT COUNT(*) FROM workouts               WHERE user_id    = ${USER_ID}) AS workouts,
      (SELECT COUNT(*) FROM workout_exercises      WHERE workout_id IN (
        SELECT id FROM workouts WHERE user_id = ${USER_ID}
      )) AS workout_exercises,
      (SELECT COUNT(*) FROM workout_sets           WHERE workout_exercise_id IN (
        SELECT we.id FROM workout_exercises we
        JOIN workouts w ON we.workout_id = w.id
        WHERE w.user_id = ${USER_ID}
      )) AS workout_sets
  `;
  console.table(counts[0]);
}

seed().catch(err => { console.error(err); process.exit(1); });
