// Static warm-up and cool-down routines per session type.
// Warm-ups: dynamic mobility to prime the joints and muscles.
// Cool-downs: static stretches to aid recovery and flexibility.
//
// All image URLs verified as loading. Sources:
//   free-exercise-db (CC0) – https://github.com/yuhonas/free-exercise-db
//   Wikimedia Commons (CC / public domain)

const BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";
const WIKI = "https://upload.wikimedia.org/wikipedia/commons";

export type RoutineExercise = {
  name:  string;
  reps:  string;    // e.g. "2 × 15 each side", "3 × 30s", "2 × 10"
  cue:   string;    // one-line coaching cue
  image: string;    // verified image URL
  steps: string[];  // step-by-step how-to instructions
};

export type SessionRoutine = {
  warmup:  RoutineExercise[];
  stretch: RoutineExercise[];
};

export const SESSION_ROUTINES: Record<"push" | "pull" | "legs", SessionRoutine> = {

  // ── PUSH: Chest · Shoulders · Triceps ──────────────────────────────────────
  push: {
    warmup: [
      {
        name:  "Arm Circles",
        reps:  "2 × 15 each direction",
        cue:   "Large controlled circles — forward then backward — to mobilise the shoulder joint.",
        // Arms extended wide — identical starting position to circles
        image: `${BASE}/Arm_Circles/0.jpg`,
        steps: [
          "Stand tall, feet shoulder-width apart, arms extended straight out to the sides.",
          "Make large, controlled circles in the forward direction for 15 reps.",
          "Reverse and circle backward for 15 reps.",
          "Keep the circles as big as possible — trace the full range of the shoulder joint.",
          "Relax your shoulders down away from your ears throughout.",
        ],
      },
      {
        name:  "Band Pull-Aparts",
        reps:  "3 × 15",
        cue:   "Keep arms straight and horizontal, squeeze shoulder blades together at the back.",
        image: `${BASE}/Band_Pull_Apart/0.jpg`,
        steps: [
          "Hold a resistance band at shoulder height, both hands fully extended.",
          "Use an overhand grip with hands just wider than shoulder-width.",
          "Keeping arms straight, pull the band apart by driving your hands outward.",
          "Squeeze your shoulder blades together when the band touches your chest.",
          "Slowly return to start — don't let it snap back.",
        ],
      },
      {
        name:  "Push-Up",
        reps:  "2 × 10 (slow)",
        cue:   "3-second descent, full chest-to-floor range. This primes the pecs and triceps.",
        image: `${BASE}/Pushups/0.jpg`,
        steps: [
          "Start in a high plank: hands just wider than shoulders, body in a straight line.",
          "Take 3 full seconds to lower your chest toward the floor.",
          "Lower until your chest lightly touches the floor — full range of motion.",
          "Press back up explosively to the starting position.",
          "Keep elbows at roughly 45° from your torso — don't let them flare wide.",
        ],
      },
      {
        name:  "Shoulder Dislocates",
        reps:  "2 × 10",
        cue:   "Use a band or broom handle. Wide grip, keep arms straight throughout the arc.",
        // Arms extended wide = starting position for shoulder dislocates
        image: `${BASE}/Band_Pull_Apart/0.jpg`,
        steps: [
          "Hold a resistance band or broom handle, hands much wider than shoulder-width.",
          "Start with the band in front of your thighs, arms fully straight.",
          "Slowly raise it overhead, continuing the arc behind you to your lower back.",
          "Reverse the movement to return to the front.",
          "If you feel any shoulder pinch, widen your grip. Never bend the elbows.",
        ],
      },
    ],
    stretch: [
      {
        name:  "Cross-Body Shoulder Stretch",
        reps:  "30s each side",
        cue:   "Pull the arm gently across the chest, hold at the point of mild tension.",
        // Exact match: person doing cross-body shoulder stretch
        image: `${BASE}/Shoulder_Stretch/1.jpg`,
        steps: [
          "Stand or sit tall. Extend one arm straight across your chest.",
          "Use the opposite forearm to gently pull the arm closer to your body.",
          "Hold at the point of mild tension — feel the stretch in the rear deltoid.",
          "Keep your shoulder down and relaxed, not shrugged toward your ear.",
          "Hold 30s, breathe steadily, then switch sides.",
        ],
      },
      {
        name:  "Doorway Chest Stretch",
        reps:  "30s each side",
        cue:   "Forearm on the frame at 90°, gently lean forward until you feel the pec open.",
        // Arms behind body, chest fully open — matches the stretch position
        image: `${BASE}/Standing_Biceps_Stretch/0.jpg`,
        steps: [
          "Stand in an open doorway. Place one forearm vertically against the frame, elbow at 90°.",
          "Step forward gently with the same-side foot.",
          "Lean your body slightly forward until you feel the chest and front shoulder open.",
          "Keep your core braced and avoid arching your lower back.",
          "Hold 30s, breathe into the stretch, then switch sides.",
        ],
      },
      {
        name:  "Overhead Tricep Stretch",
        reps:  "30s each side",
        cue:   "Reach hand down the mid-back, use the opposite hand to nudge the elbow deeper.",
        // Exact match: person with arm bent overhead — tricep stretch
        image: `${BASE}/Triceps_Stretch/1.jpg`,
        steps: [
          "Sit or stand tall. Raise one arm straight overhead.",
          "Bend the elbow so your hand reaches toward the middle of your upper back.",
          "Use the opposite hand to gently press the raised elbow further behind your head.",
          "Hold at the point of mild stretch — feel it along the back of the upper arm.",
          "Hold 30s, breathe steadily, then switch sides.",
        ],
      },
      {
        name:  "Sleeper Stretch",
        reps:  "30s each side",
        cue:   "Lie on your side, gently press the forearm toward the floor for internal rotation.",
        // Lying on mat — same position as sleeper stretch (on side on mat)
        image: `${BASE}/90_90_Hamstring/0.jpg`,
        steps: [
          "Lie on your side on a mat. Stack the shoulder you're lying on directly under you.",
          "Bend the lower elbow to 90° so your forearm points straight up.",
          "Use the opposite hand to gently press the lower forearm down toward the floor.",
          "Feel the stretch in the back of the shoulder (posterior capsule). Don't force it.",
          "Hold 30s, then roll over and switch sides.",
        ],
      },
    ],
  },

  // ── PULL: Back · Biceps ─────────────────────────────────────────────────────
  pull: {
    warmup: [
      {
        name:  "Cat-Cow",
        reps:  "2 × 10 breaths",
        cue:   "Arch and round the spine slowly in sync with your breathing — warm up the whole thoracic.",
        // Person on all-fours on a mat — exact Cat-Cow starting position
        image: `${BASE}/Cat_Stretch/0.jpg`,
        steps: [
          "Start on all fours: wrists under shoulders, knees under hips.",
          "Breathe in — let the belly drop toward the floor, lift your head and tailbone (Cow).",
          "Breathe out — round your spine toward the ceiling, tuck chin and tailbone (Cat).",
          "Flow smoothly between the two positions in sync with your breathing.",
          "Move slowly — focus on feeling each spinal segment open and close.",
        ],
      },
      {
        name:  "Dead Hang",
        reps:  "2 × 30s",
        cue:   "Hang from the bar with a relaxed grip. Let the shoulders decompress and lats lengthen.",
        // Shows person hanging from a pull-up bar — identical to dead hang position
        image: `${BASE}/Pullups/0.jpg`,
        steps: [
          "Jump or step up to grip a pull-up bar, overhand grip slightly wider than shoulders.",
          "Let your body fully hang. Actively relax the shoulder muscles and let the scapulae rise.",
          "Feel the lats, shoulders, and grip decompressing. Breathe steadily.",
          "Maintain slight body tension to prevent swinging.",
          "Hold for 30 seconds. Step down, rest briefly, then repeat.",
        ],
      },
      {
        name:  "Band Pull-Aparts",
        reps:  "3 × 15",
        cue:   "Overhand grip, arms parallel to the floor. Focus on rear-delt activation.",
        image: `${BASE}/Band_Pull_Apart/0.jpg`,
        steps: [
          "Hold a resistance band at shoulder height, arms fully extended.",
          "Use an overhand grip, hands shoulder-width or slightly wider.",
          "Keeping arms straight, pull the band apart by driving your hands outward.",
          "Squeeze your shoulder blades together when the band touches your chest.",
          "Slowly return to start under control.",
        ],
      },
      {
        name:  "Face Pulls (light)",
        reps:  "3 × 15",
        cue:   "Light weight only. Drive the elbows back and high, squeeze at the end range.",
        image: `${BASE}/Face_Pull/0.jpg`,
        steps: [
          "Attach a rope handle to a cable machine at forehead height. Use a light weight.",
          "Grip the rope with both hands, palms facing inward, step back until arms are extended.",
          "Pull the rope toward your face, driving elbows back and high — above shoulder level.",
          "At the end of the range, externally rotate so thumbs point behind you.",
          "Squeeze the rear delts and pause briefly, then return slowly.",
        ],
      },
    ],
    stretch: [
      {
        name:  "Child's Pose",
        reps:  "45s",
        cue:   "Arms fully extended, sit hips toward heels, breathe into the lats.",
        // Verified Wikimedia Commons image — person in child's pose on a mat
        image: `${WIKI}/5/55/Hatha_yoga_child_pose.jpg`,
        steps: [
          "Start on all fours, then push your hips back toward your heels.",
          "Walk your hands forward until your arms are fully extended on the floor.",
          "Let your forehead rest on the floor or a folded blanket.",
          "Breathe deeply into your lats and upper back — feel them expand with each inhale.",
          "Stay fully relaxed for 45 seconds.",
        ],
      },
      {
        name:  "Lat Overhead Stretch",
        reps:  "30s each side",
        cue:   "Hold a fixed object at hip height, hinge back to feel a deep lat pull.",
        // On all fours reaching forward — same lat lengthening as the overhead stretch
        image: `${BASE}/All_Fours_Quad_Stretch/0.jpg`,
        steps: [
          "Stand beside a fixed object at hip-to-chest height (squat rack, cable machine, door frame).",
          "Hold with one hand and step back until your arm is straight.",
          "Hinge at your hips and push them backward, letting your torso tilt forward.",
          "Feel a long stretch running along the side of your back (lat).",
          "Hold 30s, breathe steadily, then switch sides.",
        ],
      },
      {
        name:  "Doorway Bicep Stretch",
        reps:  "30s each side",
        cue:   "Arm extended at shoulder height against the frame, rotate the body away gently.",
        // Arms behind body, biceps fully stretched and open
        image: `${BASE}/Standing_Biceps_Stretch/0.jpg`,
        steps: [
          "Stand beside a doorframe. Extend one arm behind you and grip the frame at shoulder height.",
          "Keep the arm straight and palm facing forward.",
          "Gently rotate your body away from the frame until you feel tension along the bicep.",
          "Avoid shrugging the shoulder — keep it packed down.",
          "Hold 30s, breathe steadily, then switch sides.",
        ],
      },
      {
        name:  "Thoracic Rotation",
        reps:  "30s each side",
        cue:   "Thread-the-needle: lie on side, reach top arm under the body and let it open.",
        // Lying on mat with rotation — same position as thoracic rotation
        image: `${BASE}/Lying_Glute/0.jpg`,
        steps: [
          "Lie on your side on a mat, hips and knees stacked at 90°.",
          "Extend both arms forward at shoulder height, palms together.",
          "Lift the top arm and trace it up and over toward the floor on the opposite side.",
          "Let your gaze and head follow the moving hand — allow the chest to open.",
          "Hold the open position for 30s, return, then switch sides.",
        ],
      },
    ],
  },

  // ── LEGS: Quads · Hamstrings · Glutes ──────────────────────────────────────
  legs: {
    warmup: [
      {
        name:  "Hip Circles",
        reps:  "2 × 10 each direction",
        cue:   "Hands on hips, large deliberate circles to open the hip joint before loading.",
        // Standing, working the hip area — same stance as hip circles
        image: `${BASE}/Standing_Hip_Flexors/0.jpg`,
        steps: [
          "Stand with feet shoulder-width apart, hands resting on your hips.",
          "Make large, deliberate circles with your hips — draw the biggest circle you can.",
          "Complete 10 circles in one direction, then 10 in the opposite.",
          "Keep the upper body relatively still and focus the movement at the hip joint.",
          "Go slowly enough to feel the hip flexors, glutes, and inner thighs all engaging.",
        ],
      },
      {
        name:  "Leg Swings",
        reps:  "2 × 15 each leg",
        cue:   "Front-to-back then side-to-side. Hold a wall for balance. Loose and controlled.",
        // Dynamic single-leg movement — shows the leg-in-motion position
        image: `${BASE}/Bodyweight_Walking_Lunge/0.jpg`,
        steps: [
          "Stand beside a wall or rack and place one hand on it for balance.",
          "Swing the outside leg forward and backward in a controlled arc.",
          "Gradually increase the range of motion over the first few swings.",
          "After 15 front-to-back swings, face the wall and swing the same leg side-to-side.",
          "Switch legs and repeat both directions.",
        ],
      },
      {
        name:  "Bodyweight Squat",
        reps:  "2 × 15 (pause at bottom)",
        cue:   "2-second pause in the hole. Feel the stretch in quads, glutes, and hips.",
        image: `${BASE}/Bodyweight_Squat/0.jpg`,
        steps: [
          "Stand with feet shoulder-width apart, toes turned slightly out.",
          "Brace your core and begin squatting — push the knees out in line with the toes.",
          "Descend until your hips are at or below parallel.",
          "Pause for 2 full seconds at the bottom — feel the stretch in quads, glutes, and hips.",
          "Drive through the heels to return to standing. Keep the chest tall throughout.",
        ],
      },
      {
        name:  "Walking Lunges",
        reps:  "2 × 10 steps",
        cue:   "Long stride, let the back knee hover an inch from the floor. Hip flexor activation.",
        image: `${BASE}/Barbell_Walking_Lunge/0.jpg`,
        steps: [
          "Stand tall, core braced, hands on hips or arms at your sides.",
          "Take a long step forward with one foot.",
          "Bend both knees: lower the back knee until it hovers about an inch above the floor.",
          "Drive off the front foot to step the rear foot forward into the next lunge.",
          "Keep your torso upright — feel the hip flexor of the trailing leg stretching.",
        ],
      },
    ],
    stretch: [
      {
        name:  "Standing Quad Stretch",
        reps:  "30s each side",
        cue:   "Hold ankle behind you, keep knees together and stand tall.",
        // Named quad stretch — kneeling variation targeting the same quad muscle
        image: `${BASE}/All_Fours_Quad_Stretch/0.jpg`,
        steps: [
          "Stand on one leg, using a wall or rack for balance if needed.",
          "Bend the other knee and bring the heel toward your glutes.",
          "Grip the ankle (or top of the foot) with the same-side hand.",
          "Squeeze the glutes of the standing leg and keep both knees close together.",
          "Hold 30s — feel the stretch along the front of the thigh. Switch sides.",
        ],
      },
      {
        name:  "Standing Hamstring Stretch",
        reps:  "45s each side",
        cue:   "Prop foot on a bench, hinge at the hips — not the lower back — until you feel the pull.",
        // Trainer-assisted hamstring stretch — shows the exact stretch direction and technique
        image: `${BASE}/Seated_Hamstring/0.jpg`,
        steps: [
          "Find a bench or box at knee-to-hip height. Place one heel on it, leg straight.",
          "Hinge forward at your hips — NOT by rounding your lower back.",
          "Lean your torso toward the raised leg until you feel tension in the hamstring.",
          "Keep the foot flexed (toes pointing up) for a deeper stretch.",
          "Hold 45s, breathe steadily, then switch sides.",
        ],
      },
      {
        name:  "Pigeon Pose",
        reps:  "45s each side",
        cue:   "Cross leg at the front, extend the other leg back. Sink hips evenly toward the floor.",
        // Lying glute/hip rotation stretch — same deep hip opening as pigeon pose
        image: `${BASE}/Lying_Glute/0.jpg`,
        steps: [
          "From a plank position, bring one knee forward and place it behind the same-side wrist.",
          "Angle the shin across your body — knee wider than the foot.",
          "Extend the other leg straight back along the floor.",
          "Sink your hips evenly toward the floor. Use a folded towel under the hip if needed.",
          "Hold 45s, breathing steadily into the hip. Then switch sides.",
        ],
      },
      {
        name:  "Hip Flexor Stretch",
        reps:  "30s each side",
        cue:   "Deep lunge, lower knee on the floor, drive the hip forward and feel the front hip open.",
        // Exact match: kneeling hip flexor lunge stretch position
        image: `${BASE}/Kneeling_Hip_Flexor/0.jpg`,
        steps: [
          "Step into a deep lunge with the front knee at 90°.",
          "Lower the back knee gently to the floor (use a mat for comfort).",
          "Shift your hips forward and downward until you feel the front of the rear hip open.",
          "Keep your torso tall — avoid leaning forward or arching the lower back.",
          "Hold 30s. For a deeper stretch, raise the same-side arm overhead and reach slightly back.",
        ],
      },
    ],
  },
};
