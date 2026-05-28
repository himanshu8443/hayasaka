import { SITE_URL } from "@/utils/siteConfig";

const POPULAR_SEARCH_TERMS = [
  // Brand boosters
  "hayasaka",
  "hayasaka music",
  "hayasaka songs",
  // Categories
  "trending songs",
  "new songs",
  "new songs 2026",
  "latest hindi songs",
  "latest punjabi songs",
  "latest english songs",
  "bollywood songs",
  "punjabi songs",
  "english songs",
  "tamil songs",
  "telugu songs",
  "marathi songs",
  "bhojpuri songs",
  "old hindi songs",
  "90s songs",
  "80s songs",
  "lofi songs",
  "indie pop",
  "sufi songs",
  "ghazals",
  "qawwali",
  "devotional songs",
  // Moods
  "romantic songs",
  "sad songs",
  "party songs",
  "workout songs",
  "travel songs",
  "rain songs",
  "love songs",
  "breakup songs",
  // Artists
  "arijit singh",
  "atif aslam",
  "shreya ghoshal",
  "neha kakkar",
  "honey singh",
  "badshah",
  "diljit dosanjh",
  "ap dhillon",
  "jubin nautiyal",
  "armaan malik",
  "kumar sanu",
  "kishore kumar",
  "lata mangeshkar",
  "mohammed rafi",
  "sonu nigam",
  "udit narayan",
  "alka yagnik",
  "sunidhi chauhan",
  "pritam",
  "ar rahman",
  "vishal shekhar",
  "amit trivedi",
  "sachin jigar",
  "tanishk bagchi",
  "b praak",
  "darshan raval",
  "taylor swift",
  "ed sheeran",
  "the weeknd",
  "drake",
  "billie eilish",
  // Movies / soundtracks
  "aashiqui 2",
  "kabir singh",
  "animal movie songs",
  "pushpa songs",
  "rrr songs",
  "kgf songs",
  "dunki songs",
  "jawan songs",
  "pathaan songs",
  // Generic
  "download songs",
  "free music download",
  "stream music online",
];

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/signup`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/favourite`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/dmca`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const searchPages = POPULAR_SEARCH_TERMS.map((term) => ({
    url: `${SITE_URL}/search/${encodeURIComponent(term)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...searchPages];
}
