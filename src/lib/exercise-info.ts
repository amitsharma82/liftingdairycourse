// Step-by-step instructions for every exercise in the library.
// Steps are beginner-friendly with one optional coaching tip.

type ExerciseInfo = {
  steps: string[];
  tip?: string;
};

export const EXERCISE_INFO: Record<string, ExerciseInfo> = {

  // ── Push: Chest ────────────────────────────────────────────────────────────

  "Bench Press": {
    steps: [
      "Lie flat on the bench, feet flat on the floor.",
      "Grip the bar slightly wider than shoulder-width, wrists straight.",
      "Lower the bar in a controlled arc to your mid-chest.",
      "Press back up to full arm extension.",
    ],
    tip: "Keep your shoulder blades pinched together throughout.",
  },
  "Incline Bench Press": {
    steps: [
      "Set the bench to 30–45° incline.",
      "Grip the bar slightly wider than shoulder-width.",
      "Lower the bar to your upper chest (around collarbone level).",
      "Press straight up, squeeze the upper chest at the top.",
    ],
    tip: "30° hits upper chest; steeper angles shift work to the front delts.",
  },
  "Decline Bench Press": {
    steps: [
      "Set the bench to -15 to -30° and secure your feet.",
      "Grip the bar shoulder-width or slightly wider.",
      "Lower to your lower chest (below the nipple line).",
      "Press up until arms are nearly extended.",
    ],
  },
  "Dumbbell Bench Press": {
    steps: [
      "Sit on the bench with dumbbells on your thighs, then lie back.",
      "Hold dumbbells at chest level, elbows at 45–75° from your body.",
      "Press up until arms nearly extend, squeezing the chest.",
      "Lower slowly, feeling the stretch at the bottom.",
    ],
  },
  "Incline Dumbbell Press": {
    steps: [
      "Set a bench to 30–45°, sit back with dumbbells at shoulder level.",
      "Press the dumbbells up and slightly inward until they nearly touch.",
      "Lower slowly with full control to the starting position.",
    ],
    tip: "Avoid letting the dumbbells drift behind your head — keep them above the chest.",
  },
  "Dumbbell Fly": {
    steps: [
      "Lie flat, hold dumbbells above your chest with a slight bend in the elbows.",
      "Lower your arms out in a wide arc — feel the chest stretch.",
      "Stop when dumbbells reach chest level, then squeeze back to the top.",
    ],
    tip: "Think of hugging a barrel — keep the elbow bend constant throughout.",
  },
  "Incline Dumbbell Fly": {
    steps: [
      "Set bench to 30–45°, lie back with dumbbells above your chest.",
      "Lower arms out in a wide arc, feeling the upper chest stretch.",
      "Squeeze back to the top when dumbbells reach shoulder level.",
    ],
  },
  "Decline Dumbbell Fly": {
    steps: [
      "Secure feet on a decline bench, lie back with dumbbells above chest.",
      "Lower arms in a wide arc, feeling the lower chest stretch.",
      "Squeeze back to the top, maintaining the slight elbow bend.",
    ],
  },
  "Cable Fly": {
    steps: [
      "Set both cable pulleys to shoulder height, stand between them.",
      "Grab each handle, step forward, slight lean forward.",
      "Sweep your hands together in front of you in a wide arc.",
      "Slowly return to the start, feeling the chest stretch.",
    ],
  },
  "Low Cable Fly": {
    steps: [
      "Set both pulleys to the lowest position.",
      "Grab handles, step forward with a slight lean.",
      "Sweep hands upward and together to chest height.",
      "Slowly return, keeping a slight bend in the elbows.",
    ],
    tip: "Low cables hit the upper chest fibres — a great finisher after pressing.",
  },
  "High Cable Fly": {
    steps: [
      "Set both pulleys to the highest position.",
      "Grab handles, step forward with a slight lean.",
      "Sweep hands downward and together in front of your hips.",
      "Slowly return to the start position.",
    ],
    tip: "High cables target the lower chest — perfect for adding definition.",
  },
  "Machine Chest Press": {
    steps: [
      "Adjust the seat so the handles are at mid-chest height.",
      "Grip the handles and press forward until your arms are nearly extended.",
      "Slowly return to the start, letting the chest stretch fully.",
    ],
    tip: "The machine path is fixed — great for beginners learning the pressing pattern.",
  },
  "Smith Machine Bench Press": {
    steps: [
      "Position the bench under the Smith bar, lie flat.",
      "Grip just wider than shoulder-width, unrack by twisting the bar.",
      "Lower to mid-chest, then press back up.",
      "Re-rack by twisting the bar at the top.",
    ],
  },
  "Pec Deck": {
    steps: [
      "Sit upright on the machine, back flat against the pad.",
      "Place forearms on the pads (or grip the handles).",
      "Squeeze your chest to bring the pads together in front of you.",
      "Slowly release back to the start — don't let the weight stack crash.",
    ],
    tip: "Focus on squeezing the chest at the end range, not just moving the weight.",
  },
  "Push-Ups": {
    steps: [
      "Start in a high plank, hands just wider than shoulders.",
      "Lower your chest toward the floor, elbows at 45° from your torso.",
      "Lower until your chest nearly touches, then press back up.",
    ],
    tip: "Keep your body in a straight line from head to heels — no sagging hips.",
  },
  "Floor Press": {
    steps: [
      "Lie flat on the floor, barbell directly above your chest.",
      "Set up as you would for a bench press — grip just outside shoulders.",
      "Lower until your elbows touch the floor, pause briefly.",
      "Press back up to full extension.",
    ],
    tip: "The floor limits range of motion and removes leg drive — pure upper-body strength.",
  },
  "Landmine Press": {
    steps: [
      "Anchor one end of a barbell in a landmine or corner.",
      "Stand facing the bar, hold the free end at shoulder height.",
      "Press upward and forward until the arm is nearly extended.",
      "Lower under control back to shoulder level.",
    ],
  },
  "Dumbbell Pullover": {
    steps: [
      "Lie perpendicular across a bench, upper back on the bench, hips dropped.",
      "Hold one dumbbell with both hands above your chest, arms slightly bent.",
      "Lower the dumbbell in an arc over and behind your head.",
      "Pull it back over your chest, feeling the lats and chest stretch.",
    ],
    tip: "The stretch position is where the work happens — don't rush through it.",
  },
  "Svend Press": {
    steps: [
      "Hold two plates together flat between your palms at chest height.",
      "Keep constant inward squeezing pressure on the plates.",
      "Press the plates straight out in front of you, maintaining the squeeze.",
      "Pull back slowly to your chest.",
    ],
    tip: "The sustained chest contraction throughout makes this deceptively hard.",
  },

  // ── Push: Shoulders ───────────────────────────────────────────────────────

  "Overhead Press": {
    steps: [
      "Stand with the bar at upper-chest height, grip just outside shoulder-width.",
      "Brace your core and press the bar straight overhead.",
      "Lock out at the top, shrugging the traps slightly.",
      "Lower back to the starting position under control.",
    ],
    tip: "Keep your glutes squeezed — it protects your lower back during heavy sets.",
  },
  "Dumbbell Shoulder Press": {
    steps: [
      "Sit upright on a bench, dumbbells at ear level, elbows at 90°.",
      "Press both dumbbells overhead until arms are extended.",
      "Lower slowly back to ear level.",
    ],
  },
  "Machine Shoulder Press": {
    steps: [
      "Adjust the seat so handles are at shoulder height.",
      "Press the handles overhead until your arms are nearly extended.",
      "Lower slowly until your elbows return to 90°.",
    ],
    tip: "Ideal for beginners — the guided path helps groove the pressing pattern safely.",
  },
  "Arnold Press": {
    steps: [
      "Sit upright, hold dumbbells at chin level with palms facing YOU.",
      "As you press up, rotate palms outward so they face away at the top.",
      "Fully extend, then reverse the rotation as you lower back to chin height.",
    ],
    tip: "Named after Arnold Schwarzenegger — the rotation hits all three delt heads.",
  },
  "Push Press": {
    steps: [
      "Hold the barbell at shoulder height, feet shoulder-width.",
      "Dip slightly by bending your knees, then explosively drive up.",
      "Use the leg drive to initiate the press, then lock out overhead.",
      "Lower the bar under control back to the shoulders.",
    ],
    tip: "The leg drive allows you to move heavier loads than a strict press.",
  },
  "Behind The Neck Press": {
    steps: [
      "Sit upright, bar resting across your upper traps.",
      "Grip just wider than shoulder-width.",
      "Press straight up until your arms are locked out.",
      "Lower the bar back to your traps under control.",
    ],
    tip: "Use only with good shoulder mobility and light weight — skip if any impingement.",
  },
  "Z Press": {
    steps: [
      "Sit on the floor with legs straight out in front of you.",
      "Hold a barbell or dumbbells at shoulder height.",
      "Press overhead from a seated floor position, with no back support.",
      "Lower under control.",
    ],
    tip: "The floor position eliminates leg drive and forces strict core and delt engagement.",
  },
  "Bradford Press": {
    steps: [
      "Hold the bar at shoulder-width, start at chest height.",
      "Press just over the top of your head — not fully locked out.",
      "Lower behind your neck to upper traps level.",
      "Press back over your head and return to the front. That's one rep.",
    ],
    tip: "This is a mobility-demanding exercise — only perform with healthy shoulders.",
  },
  "Lateral Raises": {
    steps: [
      "Stand with dumbbells at your sides, slight bend in the elbows.",
      "Raise your arms out to the side until they reach shoulder height.",
      "Pause briefly at the top, then lower slowly.",
    ],
    tip: "Lead with your elbows, not your hands — keeps tension on the side delts.",
  },
  "Cable Lateral Raises": {
    steps: [
      "Stand beside the cable machine, low pulley on the far side.",
      "Grip the handle across your body, stand tall.",
      "Raise your arm out to the side to shoulder height.",
      "Lower under control — don't let the weight stack crash.",
    ],
  },
  "Landmine Lateral Raise": {
    steps: [
      "Anchor a barbell in a landmine. Stand with your side to the bar.",
      "Hold the free end with your far hand, arm down at your side.",
      "Raise the bar out to the side to shoulder height.",
      "Lower under control.",
    ],
  },
  "Front Raises": {
    steps: [
      "Stand with dumbbells in front of your thighs, palms facing back.",
      "Raise one or both arms forward to shoulder height, keeping arms straight.",
      "Lower slowly back to the start.",
    ],
  },
  "Cable Front Raise": {
    steps: [
      "Stand in front of the low pulley, grip the handle with one hand.",
      "Raise your arm forward to shoulder height, keeping it straight.",
      "Lower slowly back to your side.",
    ],
  },
  "Upright Row": {
    steps: [
      "Stand holding a barbell or dumbbells, hands close together.",
      "Pull the bar straight up toward your chin, elbows flaring outward.",
      "Lead with the elbows — they should be higher than your hands at the top.",
      "Lower the bar slowly.",
    ],
    tip: "Stop when elbows reach shoulder height — going higher can impinge the shoulder.",
  },
  "Cable Upright Row": {
    steps: [
      "Attach a straight bar or rope to the low pulley.",
      "Grip with hands close together, stand upright.",
      "Pull up toward your chin, elbows driving outward and upward.",
      "Lower under control.",
    ],
  },
  "Rear Delt Fly": {
    steps: [
      "Sit at the end of a bench, lean forward so your chest nearly touches your thighs.",
      "Hold dumbbells below your knees, palms facing each other.",
      "Raise both arms out to the sides in a wide arc to shoulder height.",
      "Squeeze the rear delts, then lower.",
    ],
    tip: "Use light weight — the rear delts are small and exhaust quickly.",
  },
  "Reverse Fly": {
    steps: [
      "Hinge at the hips about 45°, holding dumbbells below your chest.",
      "With slight elbow bend, raise your arms out to the sides.",
      "Squeeze shoulder blades together at the top.",
      "Lower slowly.",
    ],
  },
  "Bent Over Lateral Raise": {
    steps: [
      "Lean over a bench or hinge forward 90° at the hips.",
      "Hold dumbbells directly below your chest.",
      "Raise arms out to the sides, leading with your elbows.",
      "Lower under control.",
    ],
  },
  "Cable Face Pull": {
    steps: [
      "Set the cable pulley at face height, attach a rope handle.",
      "Grip the rope with palms facing each other, step back.",
      "Pull the rope toward your face, flaring both elbows out wide.",
      "Pause at ear level, then return slowly.",
    ],
    tip: "An essential shoulder health exercise — great for correcting internal rotation.",
  },
  "Cable Rear Delt Fly": {
    steps: [
      "Set two cable pulleys at shoulder height. Stand between them.",
      "Cross your arms and grip the opposite handles.",
      "Pull both handles outward in a reverse fly arc.",
      "Squeeze the rear delts at the end range, then return.",
    ],
  },

  // ── Push: Triceps ─────────────────────────────────────────────────────────

  "Tricep Pushdown": {
    steps: [
      "Stand at the cable machine with a bar or rope at chest height.",
      "Grip the attachment, elbows pinned tightly to your sides.",
      "Push down until arms are fully extended.",
      "Slowly let the weight rise back up to chest height.",
    ],
    tip: "Don't let your elbows flare — keeping them tucked isolates the triceps.",
  },
  "Rope Tricep Pushdown": {
    steps: [
      "Attach a rope to the high cable pulley.",
      "Grip both ends of the rope, elbows tucked to your sides.",
      "Push down, flaring the rope ends apart at the bottom for peak contraction.",
      "Slowly return to the starting position.",
    ],
    tip: "Splitting the rope at the bottom increases the range and contraction.",
  },
  "Reverse Grip Tricep Pushdown": {
    steps: [
      "Attach a bar to the high cable pulley, grip underhand (supinated).",
      "Pin elbows to your sides and push down to full extension.",
      "Slowly return — this variation targets the lateral tricep head.",
    ],
  },
  "Single Arm Tricep Pushdown": {
    steps: [
      "Attach a single handle to the high cable pulley.",
      "Grip with one hand, elbow tucked to your side.",
      "Push down to full extension, then slowly return.",
      "Complete all reps on one side before switching.",
    ],
  },
  "Skull Crushers": {
    steps: [
      "Lie flat on a bench, hold an EZ-bar or dumbbells above your forehead.",
      "Bend only at the elbows, lowering toward your forehead.",
      "Stop just above your forehead, then extend back to the start.",
    ],
    tip: "Keep your upper arms vertical and still — only the forearms move.",
  },
  "Close Grip Bench Press": {
    steps: [
      "Lie on a flat bench, grip the bar shoulder-width or slightly narrower.",
      "Lower the bar to your lower chest, keeping elbows close to your body.",
      "Press back up to full extension.",
    ],
  },
  "Overhead Tricep Extension": {
    steps: [
      "Stand or sit, hold a dumbbell or EZ-bar directly overhead.",
      "Bend at the elbows, lowering the weight behind your head.",
      "Stop when your forearms are roughly parallel to the floor.",
      "Extend back up to the start.",
    ],
  },
  "Cable Overhead Tricep Extension": {
    steps: [
      "Attach a rope to the low pulley, face away from the machine.",
      "Hold the rope overhead with both hands, elbows by your ears.",
      "Extend your forearms forward and up until arms are straight.",
      "Slowly return to the start.",
    ],
    tip: "The long head of the tricep gets a deep stretch in this overhead position.",
  },
  "Dumbbell Overhead Tricep Extension": {
    steps: [
      "Sit or stand, hold one dumbbell overhead with both hands.",
      "Lower it behind your head by bending the elbows.",
      "Extend back up without locking out harshly.",
    ],
  },
  "Tricep Dips": {
    steps: [
      "Grip parallel bars with straight arms, body upright.",
      "Lower yourself by bending at the elbows until upper arms are parallel to the floor.",
      "Press back up to full extension.",
    ],
    tip: "Leaning forward shifts work to the chest; staying upright targets the triceps.",
  },
  "Bench Dips": {
    steps: [
      "Sit on the edge of a bench, place your hands behind you gripping the bench.",
      "Walk your feet forward, lower your hips toward the floor.",
      "Bend your elbows to 90°, then press back up.",
    ],
    tip: "Extend your legs to make it harder; keep feet close to the bench to make it easier.",
  },
  "Diamond Push-Ups": {
    steps: [
      "Get into a push-up position, place hands close together forming a diamond shape.",
      "Lower your chest toward your hands, elbows flaring slightly outward.",
      "Press back up to the starting position.",
    ],
    tip: "A challenging bodyweight tricep exercise — try them on your knees if needed first.",
  },
  "Tricep Kickback": {
    steps: [
      "Hinge forward 45°, upper arm parallel to the floor, elbow at 90°.",
      "Extend your forearm back until your arm is straight.",
      "Squeeze the tricep at full extension, then return.",
    ],
    tip: "Keep your upper arm completely still — only the forearm should move.",
  },
  "JM Press": {
    steps: [
      "Set up like a close-grip bench press, lower the bar toward your neck.",
      "As the bar descends, let your elbows flare slightly forward.",
      "Pause briefly, then press back to the start — it's a hybrid of a skull crusher and close-grip press.",
    ],
    tip: "An advanced exercise — learn skull crushers and close-grip press first.",
  },
  "Tate Press": {
    steps: [
      "Lie flat, hold dumbbells above your chest with elbows pointing out wide.",
      "Lower the dumbbells by folding the elbows inward, stopping near your chest.",
      "Press back by extending the elbows outward and upward.",
    ],
    tip: "This hits the lateral and medial heads of the tricep simultaneously.",
  },
  "Machine Tricep Extension": {
    steps: [
      "Adjust the seat so the handles are at head height.",
      "Grip the handles and push down until your arms are fully extended.",
      "Slowly return to the start, keeping elbows stationary.",
    ],
  },

  // ── Pull: Back ────────────────────────────────────────────────────────────

  "Deadlift": {
    steps: [
      "Stand with the bar over your mid-foot, feet hip-width.",
      "Hinge at the hips, grip the bar just outside your legs.",
      "Take a big breath, brace your core, then drive through the floor.",
      "Stand tall at the top — don't hyperextend.",
    ],
    tip: "Think 'push the floor away' rather than 'pull the bar up'.",
  },
  "Rack Pull": {
    steps: [
      "Set the barbell in a rack at knee height.",
      "Stand with the bar over your mid-foot, grip just outside your legs.",
      "Brace, then drive through the floor to full hip extension.",
      "Lower back to the rack under control.",
    ],
    tip: "Rack pulls let you overload the lockout — great for top-end strength.",
  },
  "Barbell Row": {
    steps: [
      "Hold the bar at hip height, hinge forward ~45° with a flat back.",
      "Pull the bar toward your lower chest/stomach, squeezing shoulder blades.",
      "Lower under control — don't just drop it.",
    ],
    tip: "The bar should travel vertically — avoid swinging the torso.",
  },
  "Pendlay Row": {
    steps: [
      "Set the barbell on the floor. Hinge parallel to the ground, back flat.",
      "Explosively row the bar to your lower chest.",
      "Return the bar completely to the floor after each rep.",
    ],
    tip: "The dead-stop removes momentum — it's harder and more honest than a regular row.",
  },
  "Meadows Row": {
    steps: [
      "Anchor a barbell in a landmine. Stand perpendicular to it.",
      "Hinge forward, grip the free end with your far hand.",
      "Row the bar toward your hip in a wide arc, elbow driving high.",
      "Lower under control.",
    ],
    tip: "The angled pull hits the upper lats and teres major deeply.",
  },
  "Seal Row": {
    steps: [
      "Set two benches or boxes parallel, just wider than shoulder-width.",
      "Lie face-down so your chest is off the bench edge, bar on the floor below.",
      "Row the bar to your chest, squeezing shoulder blades.",
      "Lower until arms are straight.",
    ],
    tip: "No leg drive or torso momentum possible — the most honest rowing variant.",
  },
  "Kroc Row": {
    steps: [
      "Set up like a dumbbell row with one knee and hand on a bench.",
      "Use a very heavy dumbbell and controlled breathing (allow slight body rotation).",
      "Row the dumbbell explosively to your hip.",
      "Lower under full control.",
    ],
    tip: "Named after Matt Kroczaleski — high reps with heavy weight builds serious lat thickness.",
  },
  "Incline Dumbbell Row": {
    steps: [
      "Set an incline bench to 45°, lie chest-down with dumbbells hanging.",
      "Row both dumbbells up by pulling your elbows back.",
      "Squeeze the shoulder blades at the top, then lower.",
    ],
    tip: "The chest support removes the ability to cheat with your lower back.",
  },
  "Single Arm Dumbbell Row": {
    steps: [
      "Place your off-side knee and hand on a flat bench for support.",
      "Hold the dumbbell in the working hand, arm hanging straight down.",
      "Row the dumbbell up toward your hip, keeping the elbow close.",
      "Lower slowly until the arm is fully extended.",
    ],
  },
  "Renegade Row": {
    steps: [
      "Start in a push-up position holding two dumbbells on the floor.",
      "Keeping your core braced, row one dumbbell to your hip.",
      "Return it to the floor, then row the other side.",
    ],
    tip: "Keep your hips square to the floor — don't let them rotate as you row.",
  },
  "T-Bar Row": {
    steps: [
      "Load one end of a barbell, straddle it and hinge forward ~45°.",
      "Grip the handles (or use a V-bar attachment) under the bar.",
      "Row the bar toward your chest, keeping your back flat.",
      "Lower under control.",
    ],
  },
  "Chest Supported Row": {
    steps: [
      "Set an incline bench to 45°, lie chest-down with dumbbells hanging.",
      "Row both dumbbells up by pulling your elbows back.",
      "Squeeze the shoulder blades at the top, then lower.",
    ],
    tip: "The chest support removes the ability to cheat with your lower back.",
  },
  "Machine Row": {
    steps: [
      "Sit at the row machine, chest against the pad, grip the handles.",
      "Pull the handles toward your torso, squeezing shoulder blades together.",
      "Slowly extend your arms back to the start.",
    ],
    tip: "Great for beginners — the machine stabilises your body so you can focus on the pull.",
  },
  "Pull-Ups": {
    steps: [
      "Hang from a bar, overhand grip wider than shoulder-width.",
      "Retract your shoulder blades, then pull your chest toward the bar.",
      "Lower yourself all the way back to a full hang.",
    ],
    tip: "Start from a dead hang every rep — don't half-rep to make it easier.",
  },
  "Chin-Ups": {
    steps: [
      "Hang from a bar with an underhand (supinated) grip, hands shoulder-width.",
      "Pull your chest toward the bar, leading with your elbows.",
      "Lower slowly to a full hang.",
    ],
    tip: "The underhand grip involves the biceps more than pull-ups — often easier for beginners.",
  },
  "Weighted Pull-Ups": {
    steps: [
      "Attach a weight belt or hold a dumbbell between your feet.",
      "Hang from the bar with an overhand grip wider than shoulder-width.",
      "Pull your chest toward the bar, lower to a full hang.",
    ],
    tip: "Add weight only once you can do 8–10 clean bodyweight reps.",
  },
  "Lat Pulldown": {
    steps: [
      "Sit at the machine, grip the bar wider than shoulder-width.",
      "Lean back slightly, then pull the bar to your upper chest.",
      "Control the bar back up until your arms are fully extended.",
    ],
  },
  "Underhand Lat Pulldown": {
    steps: [
      "Sit at the cable machine, grip the bar with an underhand (supinated) grip.",
      "Pull the bar to your upper chest, leading with your elbows.",
      "Slowly extend back to the start.",
    ],
    tip: "The supinated grip increases bicep involvement and many find it easier to feel their lats.",
  },
  "Seated Cable Row": {
    steps: [
      "Sit upright, feet on the platform, knees slightly bent.",
      "Grip the handle, keep your chest tall.",
      "Pull the handle toward your stomach, squeezing shoulder blades together.",
      "Slowly return until arms are fully extended.",
    ],
  },
  "Wide Grip Cable Row": {
    steps: [
      "Attach a wide grip bar to the cable row station.",
      "Sit upright, grip wider than shoulder-width.",
      "Row the bar to your lower chest, squeezing shoulder blades.",
      "Return under control to full arm extension.",
    ],
    tip: "The wide grip places more emphasis on the upper back and rear delts.",
  },
  "Straight Arm Pulldown": {
    steps: [
      "Stand at the high pulley, grip the bar with straight arms.",
      "Keeping arms straight, pull the bar down to your thighs.",
      "Squeeze your lats at the bottom, then slowly return.",
    ],
    tip: "This isolates the lats without the biceps — think of it as a lat isolation exercise.",
  },
  "Cable Pullover": {
    steps: [
      "Attach a rope to the high pulley. Bend forward slightly facing the cable.",
      "Grip the rope with both hands above your head.",
      "Pull the rope down in an arc toward your hips, keeping arms slightly bent.",
      "Slowly return overhead.",
    ],
  },
  "Face Pulls": {
    steps: [
      "Set the cable pulley at face height, attach a rope handle.",
      "Grip the rope with palms facing each other, step back.",
      "Pull the rope toward your face, flaring both elbows out wide.",
      "Pause at the ears, then return slowly.",
    ],
    tip: "Essential for shoulder health — most people skip this and regret it later.",
  },
  "Good Mornings": {
    steps: [
      "Place the bar across your upper back as you would for a squat.",
      "With a slight knee bend, hinge forward at the hips until your torso is nearly parallel.",
      "Keep your back flat and core braced throughout.",
      "Drive your hips forward to return to standing.",
    ],
    tip: "Think of this as a hip hinge, not a back exercise — the spine stays neutral.",
  },
  "Back Extension": {
    steps: [
      "Set the hyperextension bench so the pad is at hip height.",
      "Cross your arms on your chest or behind your head.",
      "Lower your torso toward the floor, then raise back to level with your body.",
    ],
    tip: "Don't hyperextend past neutral at the top — stop when your body is in a straight line.",
  },

  // ── Pull: Biceps ──────────────────────────────────────────────────────────

  "Barbell Curl": {
    steps: [
      "Stand with a barbell at hip height, underhand grip shoulder-width.",
      "Pin your elbows to your sides and curl the bar to shoulder height.",
      "Squeeze the biceps at the top, then lower slowly.",
    ],
  },
  "EZ Bar Curl": {
    steps: [
      "Grip the EZ bar on the inner angled grips, underhand.",
      "Pin elbows to your sides and curl to shoulder height.",
      "Squeeze the biceps at the top, then lower slowly.",
    ],
    tip: "The angled grip reduces wrist strain compared to a straight barbell.",
  },
  "21s Barbell Curl": {
    steps: [
      "Perform 7 reps from the bottom to the halfway point.",
      "Perform 7 reps from the halfway point to the top.",
      "Perform 7 full reps through the entire range of motion.",
    ],
    tip: "This technique creates maximum time under tension across all portions of the curl.",
  },
  "Dumbbell Curl": {
    steps: [
      "Stand with dumbbells at your sides, palms facing forward.",
      "Curl both (or alternating) dumbbells up to shoulder height.",
      "Squeeze at the top, then slowly lower.",
    ],
  },
  "Incline Dumbbell Curl": {
    steps: [
      "Set a bench to 45–60° incline, sit back with arms hanging straight down.",
      "Curl both dumbbells simultaneously, keeping your upper arm vertical.",
      "Lower until your arms are fully extended.",
    ],
    tip: "The stretched starting position hits the long head of the bicep uniquely.",
  },
  "Concentration Curl": {
    steps: [
      "Sit on a bench, brace your elbow against the inside of your thigh.",
      "Curl the dumbbell to your shoulder, fully contracting the bicep.",
      "Lower slowly back to full extension.",
    ],
    tip: "The braced elbow eliminates all momentum — pure bicep isolation.",
  },
  "Spider Curl": {
    steps: [
      "Lie face-down on an incline bench set to 45°.",
      "Let your arms hang straight down, grip dumbbells or a barbell.",
      "Curl upward by only bending your elbows — upper arms stay vertical.",
      "Lower under full control.",
    ],
    tip: "Eliminates momentum completely — one of the strictest curl variations.",
  },
  "Drag Curl": {
    steps: [
      "Hold a barbell at your hips, underhand grip.",
      "Curl the bar up by dragging it along your torso — keep it touching your body.",
      "Your elbows will move backward as you curl.",
      "Lower back down the same path.",
    ],
    tip: "Maximally engages the short head of the bicep with high elbow flexion.",
  },
  "Hammer Curl": {
    steps: [
      "Stand with dumbbells at your sides, palms facing each other (neutral grip).",
      "Curl the dumbbells up without rotating your wrists.",
      "Lower slowly.",
    ],
    tip: "Hammer grip targets the brachialis — the muscle under the bicep that adds arm thickness.",
  },
  "Cross Body Hammer Curl": {
    steps: [
      "Hold dumbbells at your sides with a neutral grip.",
      "Curl one dumbbell across your body toward the opposite shoulder.",
      "Lower slowly, then alternate sides.",
    ],
  },
  "Zottman Curl": {
    steps: [
      "Start with dumbbells in a supinated (underhand) grip.",
      "Curl up as in a standard curl, squeezing the biceps at the top.",
      "At the top, rotate your wrists so palms face down.",
      "Lower in this pronated position — this loads the forearms eccentrically.",
    ],
    tip: "Trains both the biceps concentrically and the forearms eccentrically in one rep.",
  },
  "Reverse Curl": {
    steps: [
      "Hold a barbell with an overhand (pronated) grip, hands shoulder-width.",
      "Curl the bar up to your shoulders, keeping elbows tucked.",
      "Lower slowly.",
    ],
    tip: "The overhand grip targets the brachialis and foreform extensors.",
  },
  "Preacher Curl": {
    steps: [
      "Sit at the preacher bench, drape your upper arms over the angled pad.",
      "Grip the bar with an underhand grip.",
      "Curl from full extension up to the top, then lower slowly.",
    ],
    tip: "Full extension at the bottom is what makes preacher curls uniquely effective.",
  },
  "Machine Curl": {
    steps: [
      "Sit at the curl machine, align your elbows with the machine's pivot point.",
      "Curl the pads upward to full contraction.",
      "Lower slowly back to the start.",
    ],
  },
  "Cable Curl": {
    steps: [
      "Stand at the cable machine, low pulley with a bar or handle attachment.",
      "Grip underhand, pin elbows to your sides.",
      "Curl up to shoulder height, squeeze, then lower under control.",
    ],
  },
  "Bayesian Cable Curl": {
    steps: [
      "Attach a handle to the low cable. Stand facing away from the machine.",
      "Hold the handle at your side with your elbow behind your body.",
      "Curl forward and upward, keeping your elbow fixed behind you.",
      "Lower slowly, letting the shoulder stretch the bicep.",
    ],
    tip: "The behind-the-body elbow position creates a long head stretch unavailable in standard curls.",
  },
  "Cable Hammer Curl": {
    steps: [
      "Attach a rope to the low cable pulley.",
      "Grip both ends of the rope in a neutral (hammer) grip.",
      "Curl upward without rotating your wrists.",
      "Lower under control.",
    ],
  },

  // ── Legs: Quads / Hamstrings ──────────────────────────────────────────────

  "Barbell Squat": {
    steps: [
      "Rest the bar across your upper back (not your neck), feet shoulder-width.",
      "Brace your core, take a breath, then squat down — hips back and down.",
      "Lower until your thighs are at least parallel to the floor.",
      "Drive back up through your heels.",
    ],
    tip: "Keep your chest up and knees tracking over your toes throughout.",
  },
  "Front Squat": {
    steps: [
      "Rest the bar on your front deltoids, elbows high, upper arms parallel to the floor.",
      "Feet shoulder-width, toes slightly out.",
      "Squat down while keeping the torso as upright as possible.",
      "Drive up through the heels.",
    ],
    tip: "The front-loaded position demands upper back and core strength — start light.",
  },
  "Box Squat": {
    steps: [
      "Set up a box or bench at just below parallel height.",
      "Squat back and DOWN onto the box — don't just lean forward.",
      "Sit fully on the box, pause, then drive back up explosively.",
    ],
    tip: "Teaches proper squat mechanics and builds explosive power out of the hole.",
  },
  "Pause Squat": {
    steps: [
      "Set up like a standard back squat.",
      "Descend to the bottom and pause for 2–3 seconds before standing.",
      "Drive back up without any bounce.",
    ],
    tip: "Eliminates the stretch-shortening reflex — develops true strength in the hole.",
  },
  "Tempo Squat": {
    steps: [
      "Set up as a standard back squat.",
      "Lower slowly over 3–5 seconds (tempo-controlled).",
      "Pause briefly at the bottom, then press back up normally.",
    ],
    tip: "Increases time under tension — great for hypertrophy at lighter loads.",
  },
  "Overhead Squat": {
    steps: [
      "Hold a barbell locked out overhead, grip wide (snatch-width).",
      "Feet shoulder-width, toes slightly out.",
      "Squat to depth keeping the bar directly over your foot mid-line.",
      "Stand back up, maintaining bar position.",
    ],
    tip: "One of the most mobility-demanding exercises — work with an empty bar first.",
  },
  "Zercher Squat": {
    steps: [
      "Hold the barbell in the crook of your elbows, arms folded across your body.",
      "Stand with feet shoulder-width, squat down keeping your chest tall.",
      "Drive back up through your heels.",
    ],
    tip: "The awkward carry position demands serious core and upper back engagement.",
  },
  "Jefferson Squat": {
    steps: [
      "Straddle a barbell, one foot in front and one behind.",
      "Grip the bar between your legs on both sides.",
      "Squat down keeping the bar centered and your back flat.",
      "Stand back up, driving through both feet.",
    ],
    tip: "An unconventional but effective movement for asymmetrical loading and hip development.",
  },
  "Safety Bar Squat": {
    steps: [
      "Place the safety bar (cambered, with shoulder pads) across your upper back.",
      "Grip the handles in front of you.",
      "Squat to depth — the forward weight shifts more load to the quads.",
      "Drive back up.",
    ],
    tip: "Easier on the shoulders than a barbell squat — great if mobility is limited.",
  },
  "Smith Machine Squat": {
    steps: [
      "Position the bar on the Smith machine at shoulder height.",
      "Stand with feet slightly in front of the bar.",
      "Unrack and squat to parallel, then drive back up.",
    ],
    tip: "A controlled path makes this ideal for beginners learning squat mechanics.",
  },
  "Goblet Squat": {
    steps: [
      "Hold a dumbbell vertically at chest height with both hands.",
      "Feet shoulder-width, toes slightly flared.",
      "Squat down, keeping elbows inside your knees at the bottom.",
      "Drive back up through your heels.",
    ],
    tip: "A great teaching tool — the weight naturally keeps you upright.",
  },
  "Sumo Squat": {
    steps: [
      "Stand wide, toes pointed outward at 45°.",
      "Hold a dumbbell or kettlebell between your legs.",
      "Squat down, keeping your chest up and knees tracking over toes.",
      "Drive back up through your heels.",
    ],
    tip: "Wider stance emphasises the inner thighs and glutes.",
  },
  "Hack Squat": {
    steps: [
      "Step into the hack squat machine, shoulder pads on your shoulders.",
      "Place feet low and shoulder-width on the platform.",
      "Lower until thighs are parallel, then press back up.",
    ],
  },
  "Leg Press": {
    steps: [
      "Sit in the machine, place feet shoulder-width on the plate.",
      "Release the safety handles and lower until knees are at 90°.",
      "Press back to near full extension — don't lock out.",
    ],
    tip: "Avoid letting your lower back round off the seat at the bottom.",
  },
  "Leg Extension": {
    steps: [
      "Sit upright in the machine, hook your feet under the pad.",
      "Extend your legs straight up until nearly locked out.",
      "Lower slowly — don't let the weight stack drop.",
    ],
    tip: "A great quad isolation exercise — best used after compound movements.",
  },
  "Leg Curl": {
    steps: [
      "Lie face-down on the machine, hook your heels under the pad.",
      "Curl your legs up toward your glutes.",
      "Pause briefly, then lower slowly back to the start.",
    ],
  },
  "Seated Leg Curl": {
    steps: [
      "Sit upright in the machine, thighs supported, ankles on the pad.",
      "Curl your legs downward and back as far as possible.",
      "Hold briefly at the peak contraction, then return slowly.",
    ],
    tip: "The seated position lengthens the hamstrings more than lying — greater stretch.",
  },
  "Standing Leg Curl": {
    steps: [
      "Stand on the platform, one ankle hooked behind the curl pad.",
      "Curl your leg upward toward your glutes.",
      "Lower slowly, keeping your thigh stationary.",
    ],
  },
  "Nordic Hamstring Curl": {
    steps: [
      "Kneel on a mat, partner holds your ankles or anchor them under a bar.",
      "Lower your body forward as slowly as possible.",
      "Catch yourself with your hands when you can't go further.",
      "Use your arms to press back up, then use the hamstrings to pull you back to upright.",
    ],
    tip: "One of the most effective exercises for hamstring injury prevention — extremely demanding.",
  },
  "Romanian Deadlift": {
    steps: [
      "Stand holding the bar at hip height, feet hip-width.",
      "Hinge at the hips (minimal knee bend), pushing hips backward.",
      "Lower the bar along your legs, feeling the hamstring stretch.",
      "Drive hips forward to return to standing.",
    ],
    tip: "The bar should drag along your legs the entire way.",
  },
  "Stiff Leg Deadlift": {
    steps: [
      "Stand holding the bar, legs nearly straight throughout.",
      "Hinge forward at the hips, lowering the bar toward the floor.",
      "Feel the hamstrings stretch deeply.",
      "Drive hips forward to return to standing.",
    ],
    tip: "More knee lockout than an RDL — places extreme stretch on the hamstrings.",
  },
  "Single Leg Romanian Deadlift": {
    steps: [
      "Stand on one foot, holding a dumbbell in the opposite hand.",
      "Hinge at the hip, lowering the weight and raising your back leg.",
      "Keep your back flat and hips square.",
      "Drive the standing hip forward to return to upright.",
    ],
    tip: "Excellent for developing balance, proprioception, and unilateral hamstring strength.",
  },
  "Bulgarian Split Squat": {
    steps: [
      "Stand in front of a bench, place your rear foot on top.",
      "Step your front foot forward so your shin is vertical at the bottom.",
      "Lower your rear knee toward the floor.",
      "Drive through your front heel to stand back up.",
    ],
    tip: "Start light — this is one of the hardest leg exercises.",
  },
  "Split Squat": {
    steps: [
      "Step one foot forward into a lunge stance.",
      "Lower your back knee toward the floor.",
      "Drive back up through your front heel.",
      "Complete all reps on one side, then switch.",
    ],
    tip: "Unlike a lunge, you stay stationary — great for beginners before the Bulgarian split squat.",
  },
  "Walking Lunges": {
    steps: [
      "Stand tall, step forward into a lunge — front shin vertical, back knee toward the floor.",
      "Drive off your front foot to step forward into the next lunge.",
      "Alternate legs across the floor.",
    ],
  },
  "Dumbbell Lunges": {
    steps: [
      "Hold dumbbells at your sides, step forward into a lunge.",
      "Lower the back knee to just above the floor.",
      "Push back to standing and repeat with the other leg.",
    ],
  },
  "Reverse Lunges": {
    steps: [
      "Stand tall, step ONE leg backward into a lunge.",
      "Lower your back knee toward the floor.",
      "Drive off your front foot to return to standing.",
      "Alternate legs.",
    ],
    tip: "Easier on the knees than forward lunges — great for beginners.",
  },
  "Lateral Lunges": {
    steps: [
      "Stand with feet together.",
      "Step out to the side, bend that knee and push your hips back.",
      "Keep the other leg straight, feel the inner thigh stretch.",
      "Push back to center and repeat on the other side.",
    ],
    tip: "Targets the adductors and glutes in the frontal plane — often neglected.",
  },
  "Step-Ups": {
    steps: [
      "Stand in front of a box or bench.",
      "Step up with one foot, drive through that heel to stand on the box.",
      "Bring the other foot up, then step back down and repeat.",
    ],
    tip: "Drive from the front foot — don't push off the back foot.",
  },
  "Dumbbell Step-Ups": {
    steps: [
      "Hold dumbbells at your sides, stand in front of a box.",
      "Step up with one foot, drive through that heel.",
      "Stand fully upright on the box, then step back down.",
    ],
  },
  "Sissy Squat": {
    steps: [
      "Hold a fixed object for balance, feet close together.",
      "Rise onto the balls of your feet and lean back as your knees drive forward.",
      "Lower until your shins are near-parallel to the floor.",
      "Drive back up to standing.",
    ],
    tip: "An advanced quad isolator — the knee goes far forward by design. Start very light.",
  },
  "Calf Raises": {
    steps: [
      "Stand with the balls of your feet on the edge of a step, heels hanging off.",
      "Rise up onto your toes as high as possible.",
      "Lower slowly below the step level for a full stretch.",
    ],
    tip: "Slow controlled reps beat heavy partial reps every time for calves.",
  },
  "Seated Calf Raise": {
    steps: [
      "Sit on the machine with knees bent 90°, pads resting on your knees.",
      "Rise onto the balls of your feet as high as possible.",
      "Lower fully for a deep calf stretch.",
    ],
    tip: "The seated position targets the soleus muscle (deeper calf) more than standing.",
  },
  "Single Leg Calf Raise": {
    steps: [
      "Stand on one foot on the edge of a step.",
      "Lower the heel below the step for a full stretch.",
      "Rise as high as possible, then lower slowly.",
    ],
    tip: "Single-leg calf raises produce double the load — highly effective for strength and growth.",
  },
  "Leg Press Calf Raise": {
    steps: [
      "Set up in the leg press machine, place only the balls of your feet on the low edge of the plate.",
      "Press the balls of your feet forward, extending your ankles fully.",
      "Lower slowly, letting your heels drop for a full stretch.",
    ],
  },
  "Cable Pull-Through": {
    steps: [
      "Stand facing away from the cable machine, low pulley between your legs.",
      "Grip the rope with both hands and step forward.",
      "Hinge at the hips, letting the cable pull your hands back through your legs.",
      "Drive your hips forward to return to standing, squeezing your glutes.",
    ],
    tip: "Focuses purely on the hip hinge pattern — great for warming up for deadlifts.",
  },

  // ── Legs: Glutes ──────────────────────────────────────────────────────────

  "Hip Thrust": {
    steps: [
      "Sit on the floor with your upper back against a bench, bar across your hips.",
      "Feet flat on the floor, hip-width apart.",
      "Drive your hips up until your body forms a straight line from knees to shoulders.",
      "Squeeze your glutes hard at the top, then lower.",
    ],
    tip: "Use a bar pad for comfort — the glute squeeze at the top is everything.",
  },
  "Banded Hip Thrust": {
    steps: [
      "Place a resistance band just above your knees.",
      "Set up as you would for a hip thrust — upper back on bench, feet flat.",
      "Drive your hips up, pushing your knees outward against the band.",
      "Squeeze glutes hard at the top.",
    ],
    tip: "The band adds abductor activation — excellent for targeting glute medius.",
  },
  "Single Leg Hip Thrust": {
    steps: [
      "Set up like a regular hip thrust but extend one leg straight out.",
      "Drive through the planted foot to thrust your hips upward.",
      "Squeeze the glute at the top, lower, and complete all reps before switching.",
    ],
    tip: "Doubles the load per glute — great for addressing imbalances.",
  },
  "Deficit Hip Thrust": {
    steps: [
      "Place your feet on a plate or low box, upper back on bench.",
      "The elevated feet increase the range of motion.",
      "Drive your hips up to full extension, squeezing the glutes.",
      "Lower until your hips are below the bench level.",
    ],
    tip: "Greater range means more glute stretch — increases hypertrophy stimulus.",
  },
  "Smith Machine Hip Thrust": {
    steps: [
      "Set the Smith machine bar at hip height when seated on the floor.",
      "Sit with your upper back against a bench, bar across your hips.",
      "Drive your hips up to full extension.",
      "Lower under control.",
    ],
    tip: "The fixed bar path makes loading and setup easier than a free barbell.",
  },
  "Sumo Deadlift": {
    steps: [
      "Stand with feet wider than shoulder-width, toes pointed well outward.",
      "Grip the bar inside your legs, keeping your chest up.",
      "Drive through the floor, keeping the bar close and torso more upright.",
      "Stand tall at the top.",
    ],
  },
  "Cable Kickback": {
    steps: [
      "Attach an ankle cuff to the low pulley cable.",
      "Face the machine, brace yourself on the frame.",
      "Kick your working leg back and up, squeezing the glute at the top.",
      "Slowly lower back down.",
    ],
  },
  "Glute Bridge": {
    steps: [
      "Lie on your back, knees bent, feet flat on the floor hip-width apart.",
      "Drive your hips straight up by squeezing your glutes.",
      "Hold at the top for 1–2 seconds.",
      "Lower slowly and repeat.",
    ],
    tip: "A lighter, more joint-friendly alternative to the hip thrust — perfect as a warm-up.",
  },
  "Banded Glute Bridge": {
    steps: [
      "Place a resistance band just above your knees.",
      "Lie on your back, knees bent, feet flat.",
      "Drive your hips up, pushing your knees outward against the band.",
      "Squeeze glutes at the top.",
    ],
  },
  "Single Leg Glute Bridge": {
    steps: [
      "Lie on your back, one knee bent with foot flat, other leg extended up.",
      "Drive the planted foot into the floor to raise your hips.",
      "Squeeze the glute hard at the top, then lower.",
    ],
    tip: "Isolates each glute independently — reveals and corrects side-to-side imbalances.",
  },
  "Donkey Kicks": {
    steps: [
      "Start on all fours, wrists under shoulders, knees under hips.",
      "Keeping your knee bent, kick one leg back and up toward the ceiling.",
      "Squeeze the glute at the top, then return.",
      "Complete all reps on one side before switching.",
    ],
    tip: "Move slowly and feel the glute working — momentum defeats the purpose.",
  },
  "Fire Hydrants": {
    steps: [
      "Start on all fours.",
      "Keeping your knee bent at 90°, raise one leg out to the side.",
      "Lift until your thigh is parallel to the floor.",
      "Lower and repeat.",
    ],
    tip: "Targets the glute medius — essential for hip stability and reducing knee valgus.",
  },
  "Side-Lying Clamshell": {
    steps: [
      "Lie on your side, hips stacked, knees bent at 45°.",
      "Keeping your feet together, raise your top knee as high as you can.",
      "Lower slowly and repeat.",
    ],
    tip: "Place a band above your knees to increase resistance as you progress.",
  },
  "Reverse Hyperextension": {
    steps: [
      "Lie face-down on a hyperextension bench, legs hanging off the back.",
      "Grip the handles and raise your legs until they are level with your torso.",
      "Squeeze your glutes at the top.",
      "Lower slowly.",
    ],
    tip: "Decompresses the spine while strengthening the posterior chain — great post-deadlift.",
  },
  "Frog Pumps": {
    steps: [
      "Lie on your back, bring the soles of your feet together (diamond position).",
      "Drive your hips upward by squeezing your glutes.",
      "Do short, rapid pumps at the top of the range.",
    ],
    tip: "The turned-out hip position uniquely activates the glute medius and minimus.",
  },

  // ── Core ──────────────────────────────────────────────────────────────────

  "Plank": {
    steps: [
      "Place forearms on the floor, elbows under shoulders.",
      "Extend your legs behind you, on the balls of your feet.",
      "Hold a straight line from head to heels — no sagging or raised hips.",
    ],
    tip: "Squeeze your glutes and abs together — it's not just about holding still.",
  },
  "Side Plank": {
    steps: [
      "Lie on your side, prop yourself up on one forearm.",
      "Raise your hips until your body forms a straight diagonal line.",
      "Hold the position, keeping your hips lifted.",
    ],
    tip: "The side plank targets the obliques and quadratus lumborum — critical for spinal stability.",
  },
  "Hollow Body Hold": {
    steps: [
      "Lie on your back, extend arms overhead and legs straight out.",
      "Press your lower back into the floor by contracting your abs.",
      "Raise your shoulders and legs off the floor slightly.",
      "Hold this banana-shape with maximum tension.",
    ],
    tip: "The lower back must stay flat on the floor — this is the key to the position.",
  },
  "Dead Bug": {
    steps: [
      "Lie on your back, arms extended straight up, knees bent at 90° in the air.",
      "Press your lower back firmly into the floor.",
      "Slowly lower your right arm and left leg toward the floor.",
      "Return and repeat on the opposite side.",
    ],
    tip: "If your lower back lifts off the floor, you've gone too far — reduce the range.",
  },
  "Ab Crunch": {
    steps: [
      "Lie on your back, knees bent, feet flat on the floor.",
      "Place hands behind your head or across your chest.",
      "Curl your shoulders toward your knees — don't pull on your neck.",
      "Lower slowly.",
    ],
    tip: "The crunch is a short range movement — your lower back should stay on the floor.",
  },
  "Decline Crunch": {
    steps: [
      "Secure your feet on a decline bench, lie back.",
      "Curl your shoulders up toward your knees.",
      "Lower back to just above parallel.",
    ],
    tip: "The decline position increases the range and load compared to a flat crunch.",
  },
  "Reverse Crunch": {
    steps: [
      "Lie on your back, hands at your sides or under your hips.",
      "Bring your knees toward your chest, curling your hips off the floor.",
      "Lower your legs back to the start.",
    ],
    tip: "Focus on curling the pelvis up — not just lifting the legs.",
  },
  "Bicycle Crunch": {
    steps: [
      "Lie on your back, hands behind your head, knees bent.",
      "Bring one knee toward your chest while rotating toward it with the opposite elbow.",
      "Alternate sides in a cycling motion.",
    ],
    tip: "Control the movement — don't rush. Rotation quality matters more than speed.",
  },
  "Weighted Crunch": {
    steps: [
      "Lie on your back, hold a weight plate or dumbbell across your chest.",
      "Curl your shoulders toward your knees against the added resistance.",
      "Lower slowly.",
    ],
  },
  "Cable Crunch": {
    steps: [
      "Kneel in front of the cable machine, rope attachment at head height.",
      "Hold the rope by your temples, core braced.",
      "Crunch downward — pulling your elbows toward your knees.",
      "Slowly return to the start.",
    ],
    tip: "The weight should be pulling you from the abs — not the arms.",
  },
  "Decline Weighted Crunch": {
    steps: [
      "Secure feet on a decline bench, hold a weight plate to your chest.",
      "Crunch your shoulders toward your knees.",
      "Lower slowly back down.",
    ],
  },
  "Leg Raises": {
    steps: [
      "Lie flat on a bench or the floor, hands under your hips.",
      "With legs nearly straight, raise them until they are vertical.",
      "Lower slowly — don't let them crash to the floor.",
    ],
    tip: "Press your lower back into the surface as you lower — this is the challenge.",
  },
  "Hanging Leg Raises": {
    steps: [
      "Hang from a bar with a shoulder-width grip.",
      "With controlled motion, raise your legs until they are parallel to the floor.",
      "Lower slowly.",
    ],
    tip: "Avoid swinging — if you swing, do smaller controlled reps.",
  },
  "Toes To Bar": {
    steps: [
      "Hang from a bar with a shoulder-width overhand grip.",
      "With straight or slightly bent legs, raise your toes to touch the bar.",
      "Lower under full control.",
    ],
    tip: "An advanced movement — work on hanging leg raises first.",
  },
  "L-Sit": {
    steps: [
      "Sit on the floor between two parallettes or on dip bars.",
      "Press into the handles to lift your body off the floor.",
      "Extend your legs straight out in front, parallel to the floor.",
      "Hold the position.",
    ],
    tip: "Even a 5-second hold is impressive at first — build up gradually.",
  },
  "Dragon Flag": {
    steps: [
      "Lie on a bench and grip it behind your head.",
      "Keeping your body rigid, raise your legs and torso until your body is vertical.",
      "Lower slowly, keeping your body completely straight like a plank.",
    ],
    tip: "Made famous by Bruce Lee — one of the hardest core exercises. Tuck your knees to regress.",
  },
  "Ab Rollout": {
    steps: [
      "Kneel on the floor holding an ab wheel (or barbell with round plates).",
      "Roll the wheel forward, extending your body out.",
      "Go as far as you can while keeping your lower back from sagging.",
      "Roll back in using your core.",
    ],
    tip: "Start with short rolls — a full rollout to the floor is very advanced.",
  },
  "Russian Twist": {
    steps: [
      "Sit on the floor, knees bent, feet elevated or anchored.",
      "Lean back slightly, hold a weight or clasp your hands.",
      "Rotate your torso side to side.",
    ],
    tip: "Slow, controlled rotations with full range of motion beat fast, shallow twists.",
  },
  "V-Ups": {
    steps: [
      "Lie flat, arms extended overhead, legs straight.",
      "Simultaneously raise your legs and torso to meet in the middle.",
      "Touch your feet with your hands at the top.",
      "Lower slowly.",
    ],
    tip: "Keep the movement controlled — don't use momentum to swing up.",
  },
  "Flutter Kicks": {
    steps: [
      "Lie on your back, hands under your hips, legs slightly off the floor.",
      "Alternately raise and lower each leg in a short, rapid flutter.",
      "Keep your lower back pressed into the floor throughout.",
    ],
  },
  "Mountain Climbers": {
    steps: [
      "Start in a high plank position.",
      "Drive one knee toward your chest, then quickly switch to the other.",
      "Alternate rapidly while keeping your hips level.",
    ],
    tip: "Keep your hips down — don't let them bob up as the pace increases.",
  },
  "Pallof Press": {
    steps: [
      "Attach a handle to the cable at chest height. Stand side-on to the machine.",
      "Hold the handle at your sternum with both hands.",
      "Press it straight out in front of you and hold for 2 seconds.",
      "Pull it back to your sternum.",
    ],
    tip: "The goal is to resist rotation — the harder you fight the cable, the more your obliques work.",
  },
  "Woodchop": {
    steps: [
      "Attach a handle to the high cable. Stand side-on, cable above your shoulder.",
      "Grip the handle with both hands, pull it diagonally down across your body.",
      "Rotate your torso through the movement.",
      "Return slowly to the start.",
    ],
    tip: "The hips drive the rotation — don't just use your arms.",
  },
  "Landmine Rotation": {
    steps: [
      "Anchor a barbell in a landmine attachment at chest height.",
      "Hold the free end with both hands, standing upright.",
      "Rotate the bar from one side to the other in an arc.",
      "Keep your hips square and let your torso rotate.",
    ],
    tip: "A loaded anti-rotation pattern that builds real-world rotational power.",
  },
};
