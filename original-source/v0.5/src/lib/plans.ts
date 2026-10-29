import type { ReadingPlan } from "./store";

export interface PlanPreset {
  name: string;
  description: string;
  readings: Array<[string, string]>;
}

export const PLAN_PRESETS: PlanPreset[] = [
  {
    name: "Quiet Five-Day Start",
    description: "Five foundational readings for a quiet beginning.",
    readings: [
      ["Creation", "Genesis 1"],
      ["The Word", "John 1"],
      ["Faith and creation", "Hebrews 11"],
      ["The Sermon on the Mount", "Matthew 5–7"],
      ["The Resurrection", "John 20"],
    ],
  },
  {
    name: "Gospel of John — 21 Days",
    description: "One chapter of John each day.",
    readings: Array.from({ length: 21 }, (_, i) => [
      `John chapter ${i + 1}`,
      `John ${i + 1}`,
    ]),
  },
  {
    name: "Jesus: Birth to Ascension",
    description: "Twelve readings following the earthly life of Jesus.",
    readings: [
      ["Birth of Jesus", "Luke 1–2"],
      ["Baptism", "Matthew 3"],
      ["Temptation", "Matthew 4:1–11"],
      ["Calling disciples", "Luke 5:1–11"],
      ["Sermon on the Mount", "Matthew 5–7"],
      ["Parables of the kingdom", "Matthew 13"],
      ["Authority and miracles", "Mark 4:35–5:43"],
      ["The Last Supper", "John 13"],
      ["Crucifixion", "John 18–19"],
      ["Resurrection", "John 20"],
      ["Great Commission", "Matthew 28"],
      ["Ascension", "Acts 1:1–11"],
    ],
  },
  {
    name: "Psalms for Peace",
    description: "Ten psalms on trust, refuge, gratitude, and care.",
    readings: [
      ["The two paths", "Psalm 1"],
      ["Secure refuge", "Psalm 16"],
      ["The Good Shepherd", "Psalm 23"],
      ["Confidence in trouble", "Psalm 27"],
      ["Taste and see", "Psalm 34"],
      ["God our refuge", "Psalm 46"],
      ["Under His wings", "Psalm 91"],
      ["Bless the LORD", "Psalm 103"],
      ["Help from the LORD", "Psalm 121"],
      ["Known by God", "Psalm 139"],
    ],
  },
  {
    name: "Proverbs for Wisdom",
    description: "Practical chapters from Proverbs.",
    readings: [
      ["Beginning of wisdom", "Proverbs 1"],
      ["Trust and guidance", "Proverbs 3"],
      ["Guard your heart", "Proverbs 4"],
      ["Wisdom’s call", "Proverbs 8"],
      ["Words and work", "Proverbs 10"],
      ["Discipline and diligence", "Proverbs 12"],
      ["Gentle answers", "Proverbs 15"],
      ["Plans and humility", "Proverbs 16"],
      ["Friendship and counsel", "Proverbs 27"],
      ["Strength and character", "Proverbs 31"],
    ],
  },
  {
    name: "Prayer and Trust",
    description: "Readings about prayer, dependence, and perseverance.",
    readings: [
      ["Jesus teaches prayer", "Matthew 6:5–15"],
      ["Ask, seek, knock", "Luke 11:1–13"],
      ["Morning prayer", "Psalm 5"],
      ["Thirsting for God", "Psalm 63"],
      ["A prayer for mercy", "Psalm 86"],
      ["Waiting in hope", "Psalm 130"],
      ["Prayer and peace", "Philippians 4:4–9"],
      ["Prayer in every circumstance", "James 5:13–18"],
    ],
  },
  {
    name: "Faith and Courage",
    description: "Trusting God through uncertainty.",
    readings: [
      ["Abram’s call", "Genesis 12"],
      ["Joshua commissioned", "Joshua 1"],
      ["David and Goliath", "1 Samuel 17"],
      ["The fiery furnace", "Daniel 3"],
      ["Daniel in the lions’ den", "Daniel 6"],
      ["Walking on the sea", "Matthew 14:22–33"],
      ["Examples of faith", "Hebrews 11"],
      ["More than conquerors", "Romans 8"],
    ],
  },
  {
    name: "Women of Scripture",
    description: "Influential women across the biblical narrative.",
    readings: [
      ["Sarah", "Genesis 18"],
      ["Miriam", "Exodus 15:1–21"],
      ["Deborah", "Judges 4–5"],
      ["Ruth", "Ruth 1–4"],
      ["Hannah", "1 Samuel 1–2"],
      ["Abigail", "1 Samuel 25"],
      ["Esther", "Esther 4–8"],
      ["Mary, mother of Jesus", "Luke 1–2"],
      ["The Samaritan woman", "John 4:1–42"],
      ["Mary Magdalene", "John 20:1–18"],
    ],
  },
  {
    name: "New Testament Overview",
    description: "Ten representative New Testament readings.",
    readings: [
      ["Kingdom teaching", "Matthew 5–7"],
      ["Who is Jesus?", "Mark 8"],
      ["Parables of the lost", "Luke 15"],
      ["The Word", "John 1"],
      ["Pentecost", "Acts 2"],
      ["Life in the Spirit", "Romans 8"],
      ["The way of love", "1 Corinthians 13"],
      ["Fruit of the Spirit", "Galatians 5"],
      ["Faith in action", "Hebrews 11"],
      ["New creation", "Revelation 21–22"],
    ],
  },
  {
    name: "Whole Bible Foundations",
    description: "Twelve readings tracing the biblical storyline.",
    readings: [
      ["Creation and fall", "Genesis 1–3"],
      ["Promise to Abram", "Genesis 12"],
      ["Passover", "Exodus 12"],
      ["The covenant commands", "Exodus 20"],
      ["Promise to David", "2 Samuel 7"],
      ["The Shepherd Psalm", "Psalm 23"],
      ["The suffering servant", "Isaiah 53"],
      ["The new covenant", "Jeremiah 31:31–34"],
      ["The Word becomes flesh", "John 1"],
      ["Righteousness through faith", "Romans 3"],
      ["Saved by grace", "Ephesians 2"],
      ["All things made new", "Revelation 21–22"],
    ],
  },
];

export function planFromPreset(preset: PlanPreset): ReadingPlan {
  return {
    id: `plan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: preset.name,
    description: preset.description,
    steps: preset.readings.map(([title, reference]) => ({
      title,
      reference,
      complete: false,
    })),
  };
}

export function uniquePlanName(name: string, existing: string[]): string {
  if (!existing.some((n) => n.toLowerCase() === name.toLowerCase())) return name;
  let i = 2;
  while (existing.some((n) => n.toLowerCase() === `${name} (${i})`.toLowerCase())) i += 1;
  return `${name} (${i})`;
}

export function planProgress(plan: ReadingPlan): { done: number; total: number; percent: number } {
  const done = plan.steps.filter((s) => s.complete).length;
  const total = plan.steps.length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done * 100) / total) };
}
