export default function sitemap() {
  const baseUrl = "https://hayasaka.8man.in";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/favourite`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Popular search terms for music - these help Google index search pages
  const popularSearchTerms = [
    "arijit singh",
    "bollywood songs",
    "latest hindi songs",
    "punjabi songs",
    "English songs",
    "romantic songs",
    "sad songs",
    "party songs",
    "old hindi songs",
    "90s songs",
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
    "aashiqui 2",
    "kabir singh",
    "animal movie songs",
    "pushpa songs",
    "rrr songs",
    "kgf songs",
    "love songs",
    "workout songs",
    "travel songs",
    "rain songs",
    "sufi songs",
    "devotional songs",
    "ghazals",
    "qawwali",
    "indie pop",
    "download songs",
  ];

  const searchPages = popularSearchTerms.map((term) => ({
    url: `${baseUrl}/search/${encodeURIComponent(term)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...searchPages];
}
