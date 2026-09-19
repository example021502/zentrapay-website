const { pool } = require("../config/db");

const IMG = "https://placehold.net/600x600.png";

const homeHighlights = [
  {
    title: "Seamless Transactions",
    description:
      "Experience swift and secure transactions that allow you to send and receive money effortlessly, anytime and anywhere.",
    icon: "smartphone",
  },
  {
    title: "Cross-Border Payments",
    description:
      "Enjoy the convenience of secure cross-border transactions that connect you with businesses and individuals around the globe.",
    icon: "security",
  },
  {
    title: "Personalized Banking Solutions",
    description:
      "Benefit from tailored banking solutions that cater to your specific needs, ensuring you have the right tools at your disposal.",
    icon: "speed",
  },
];

const deviceFeatures = [
  "Manage multi-currency balances and cross-border transfers effortlessly from your smartphone.",
  "Execute lightning-fast mobile money and bank payouts with advanced encryption security.",
  "Track transaction histories, view real-time analytics, and monitor cash flow on the go.",
  "Integrate your daily financial operations seamlessly with Zentrapay's intuitive mobile dashboard.",
];

const testimonials = Array.from({ length: 8 }).map(() => ({
  name: "David Monarch",
  profession: "Software Engineer",
  profile_image_url: IMG,
  message:
    "Fast, borderless, and incredibly secure! Zentrapay has made mobile transactions completely seamless for me. I love how easy it is to manage everything right from my phone without any hidden hassles.",
}));
// First testimonial keeps its distinct copy from the original design.
testimonials[0].message =
  "What stands out most about Zentrapay is the sheer reliability and security. Knowing that my transactions are protected by advanced encryption gives me total confidence every time I send money to friends or business partners. It's modern, seamless, and genuinely built for our needs.";
testimonials[1].message =
  "Managing multi-currency balances and sending instant payments used to be a major hurdle for my daily operations. With Zentrapay, everything is streamlined right from my smartphone. The transfers are lightning-fast, and the interface is incredibly intuitive. It's easily the best financial tool I've used in the region.";

const teamMembers = [
  {
    name: "Evans Ackaah",
    position: "Founder and CEO",
    profile_image_url: IMG,
    description:
      "With over 15 years in fintech leadership, Evans has a vision for a borderless financial future. His expertise in technology and passion for social impact guides Zentrapay's strategic direction.",
  },
  {
    name: "Jane Smith",
    position: "CTO",
    profile_image_url: IMG,
    description:
      "Jane is a tech visionary with a strong background in AI and mobile solutions. She leads the development of our innovative ZWallet technology, ensuring security and user-friendliness at every step.",
  },
  {
    name: "Michael Brown",
    position: "CMO",
    profile_image_url: IMG,
    description:
      "Michael brings a wealth of marketing experience to the team, focusing on building brand awareness and community engagement. His strategies aim to make Zentrapay synonymous with seamless payments in Africa.",
  },
];

const achievements = [
  {
    heading: "Expanding Partnerships",
    achievement_date: "2025-05-09",
    image_url: IMG,
    description:
      "By 2023, Zentrapay forged strategic partnerships with leading financial institutions and tech companies, enhancing our service offerings. These collaborations have further solidified our position as a leader in fintech solutions for Africa.",
  },
  {
    heading: "Founding Zentrapay",
    achievement_date: "2025-05-09",
    image_url: IMG,
    description:
      "In 2021, Zentrapay was founded with a mission to revolutionize payments in Africa. Our founders recognized the challenges faced by individuals and businesses in cross-border transactions and set out to create a solution that would bridge these gaps.",
  },
  {
    heading: "Launching ZWallet",
    achievement_date: "2025-05-09",
    image_url: IMG,
    description:
      "In 2022, we launched ZWallet, our flagship product that integrates voice AI and secure payment solutions. This innovative platform has empowered thousands of users to manage their finances effortlessly and securely.",
  },
];

const collaborations = [
  {
    heading: "Fintech Alliance",
    image_url: IMG,
    description:
      "Our partnership with the Fintech Alliance has provided us with valuable insights and resources, enabling us to stay at the forefront of technological advancements. Together, we aim to foster innovation and drive financial inclusion across the continent.",
  },
  {
    heading: "Global Payments Network",
    image_url: IMG,
    description:
      "Collaborating with a Global Payments Network allows us to offer our users secure cross-border transactions. This partnership enhances our capabilities, ensuring that payments are not only seamless but also efficient and reliable.",
  },
  {
    heading: "Local Banking Institutions",
    image_url: IMG,
    description:
      "Our alliances with local banks empower us to provide tailored banking solutions that cater to the specific needs of our users. These partnerships facilitate inclusive banking practices, bringing financial services to underserved communities.",
  },
];

const blogCategories = [
  {
    title: "Zentrapay News Hub",
    subtitle:
      "Stay informed with the latest developments, features, and updates from Zentrapay.",
    posts: [
      { heading: "Introducing Zentrapay, Your Financial Companion", post_date: "2025-05-09" },
      { heading: "Zentrapay Expands Global Reach", post_date: "2025-05-09" },
      { heading: "User Success Story: Empowering Small Businesses", post_date: "2025-05-09" },
      { heading: "Advanced Security Measures Rollout", post_date: "2025-06-12" },
      { heading: "Zentrapay Wins Fintech Innovation Award", post_date: "2025-07-24" },
      { heading: "Seamless Multi-Currency Support Available Now", post_date: "2025-08-15" },
    ],
  },
  {
    title: "Mastering ZWallet",
    subtitle:
      "Learn expert tips, optimization strategies, and best practices to get the most out of your digital wallet.",
    posts: [
      { heading: "Top 5 Tips for Secure Mobile Transactions", post_date: "2025-09-01" },
      { heading: "How to Manage Multi-Currency Balances Like a Pro", post_date: "2025-09-14" },
      { heading: "Automating Your Monthly Budgeting inside ZWallet", post_date: "2025-10-03" },
      { heading: "Understanding Transaction Fees and How to Save", post_date: "2025-10-20" },
    ],
  },
  {
    title: "Fintech Trends Uncovered",
    subtitle:
      "Dive deep into the shifting landscape of global finance, mobile money, and digital transformation.",
    posts: [
      { heading: "The Future of Borderless Payments in Africa", post_date: "2025-11-05" },
      { heading: "How AI is Reshaping Modern Banking Security", post_date: "2025-11-18" },
      { heading: "The Rise of Decentralized Mobile Wallets", post_date: "2025-12-02" },
      { heading: "Financial Inclusion: Bridging the Gap Through Tech", post_date: "2025-12-15" },
    ],
  },
];

const featureCategories = [
  {
    title: "Secure Transaction, Anytime",
    subtitle: "Empowering Your Payments Globally",
    features: [
      {
        heading: "End-to-End Encryption",
        description:
          "Zentrapay employs cutting-edge encryption technology to ensure your transactions remain confidential and secure. Each payment is fortified with robust security protocols, safeguarding your financial data against unauthorized access and fraud. Rest easy knowing your money is protected, no matter where you are.",
      },
      {
        heading: "Real-Time Fraud Detection",
        description:
          "Our advanced algorithms monitor transactions in real-time, instantly identifying and flagging any suspicious activity. With immediate alerts and proactive measures, we strive to protect your assets and provide you with peace of mind during cross-border transactions. Experience unparalleled security with Zentrapay.",
      },
      {
        heading: "Global Compliance Standards",
        description:
          "Zentrapay adheres to international compliance regulations, ensuring that all cross-border transactions meet the legal requirements of various countries. This commitment not only protects your payments but also fosters trust and confidence in our services. Join us in making secure cross-border payments a reality.",
      },
    ],
  },
  {
    title: "Banking for Everyone",
    subtitle: "Empowering Underserved Communities",
    features: [
      {
        heading: "Accessible Account Setup",
        description:
          "Zentrapay simplifies the account creation process, ensuring that anyone can easily access banking services. Our user-friendly platform requires minimal documentation, allowing previously unbanked populations to join the financial ecosystem effortlessly.",
      },
      {
        heading: "Microloans for Growth",
        description:
          "We offer microloans tailored for individuals and small businesses in underserved areas, facilitating economic growth and personal development. With flexible terms and competitive rates, our microloans empower communities to thrive financially.",
      },
      {
        heading: "Financial Literacy Programs",
        description:
          "Zentrapay is dedicated to educating users about personal finance through our comprehensive literacy programs. We provide valuable resources and workshops that foster better financial decision-making, helping individuals achieve their goals.",
      },
    ],
  },
  {
    title: "Zentrapay Ecosystem",
    subtitle: "Manage your finance with Finesse",
    features: [
      {
        heading: "ZWallet Overview",
        description:
          "Dive into our ZWallet ecosystem with an interactive demo that showcases its user-friendly interface and functionalities. Experience how easy it is to manage your finances, make payments, and access banking services all in one place.",
      },
      {
        heading: "Voice AI Payments",
        description:
          "Try our innovative voice AI feature that allows you to make payments hands-free. Engage with our platform using simple voice commands to execute transactions, check balances, and manage your account effortlessly.",
      },
      {
        heading: "Cross-Border Payment Simulation",
        description:
          "Experience the ease of making secure cross-border payments through our simulation. Engage with real-time scenarios to see how our platform handles transactions seamlessly across different currencies and regions.",
      },
    ],
  },
  {
    title: "Innovative Solutions for Africa",
    subtitle: "Transforming Financial Landscapes",
    features: [
      {
        heading: "Streamlined Payment Processes",
        description:
          "Explore our animated solutions that simplify the payment process for users across Africa. This visual guide demonstrates how our platform enhances user experience with fast, reliable, and secure transactions.",
      },
      {
        heading: "Empowering Entrepreneurs",
        description:
          "Our animated feature illustrates how Zentrapay supports local entrepreneurs by providing easy access to financing options. See how our services empower small businesses to grow and thrive in the digital economy.",
      },
      {
        heading: "Bridging the Financial Gap",
        description:
          "Watch how Zentrapay addresses the financial inclusion gap in Africa through our targeted initiatives. This animation highlights our efforts in providing banking services to the unbanked and underserved populations.",
      },
    ],
  },
];

const companyInfo = {
  email: "support@zentrapay.com",
  phone: "+1 (555) 123-4567",
  address: "123 Fintech Avenue, Suite 400, San Francisco, CA",
  twitter_url: "https://twitter.com",
  website_url: "https://zentrapay.com",
};

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Wipe existing data so this script is safely re-runnable.
    await client.query(`
      TRUNCATE TABLE
        home_highlights, device_features, testimonials,
        team_members, achievements, collaborations,
        blog_posts, blog_categories,
        features, feature_categories,
        company_info, contact_messages
      RESTART IDENTITY CASCADE
    `);

    for (const [i, h] of homeHighlights.entries()) {
      await client.query(
        `INSERT INTO home_highlights (title, description, icon, image_url, display_order)
         VALUES ($1, $2, $3, $4, $5)`,
        [h.title, h.description, h.icon, IMG, i],
      );
    }

    for (const [i, d] of deviceFeatures.entries()) {
      await client.query(
        `INSERT INTO device_features (description, display_order) VALUES ($1, $2)`,
        [d, i],
      );
    }

    for (const [i, t] of testimonials.entries()) {
      await client.query(
        `INSERT INTO testimonials (name, profession, profile_image_url, message, display_order)
         VALUES ($1, $2, $3, $4, $5)`,
        [t.name, t.profession, t.profile_image_url, t.message, i],
      );
    }

    for (const [i, m] of teamMembers.entries()) {
      await client.query(
        `INSERT INTO team_members (name, position, profile_image_url, description, display_order)
         VALUES ($1, $2, $3, $4, $5)`,
        [m.name, m.position, m.profile_image_url, m.description, i],
      );
    }

    for (const [i, a] of achievements.entries()) {
      await client.query(
        `INSERT INTO achievements (heading, achievement_date, image_url, description, display_order)
         VALUES ($1, $2, $3, $4, $5)`,
        [a.heading, a.achievement_date, a.image_url, a.description, i],
      );
    }

    for (const [i, c] of collaborations.entries()) {
      await client.query(
        `INSERT INTO collaborations (heading, image_url, description, display_order)
         VALUES ($1, $2, $3, $4)`,
        [c.heading, c.image_url, c.description, i],
      );
    }

    for (const [ci, cat] of blogCategories.entries()) {
      const { rows } = await client.query(
        `INSERT INTO blog_categories (title, subtitle, display_order)
         VALUES ($1, $2, $3) RETURNING id`,
        [cat.title, cat.subtitle, ci],
      );
      const categoryId = rows[0].id;
      for (const [pi, post] of cat.posts.entries()) {
        await client.query(
          `INSERT INTO blog_posts (category_id, heading, image_url, post_date, display_order)
           VALUES ($1, $2, $3, $4, $5)`,
          [categoryId, post.heading, IMG, post.post_date, pi],
        );
      }
    }

    for (const [ci, cat] of featureCategories.entries()) {
      const { rows } = await client.query(
        `INSERT INTO feature_categories (title, subtitle, display_order)
         VALUES ($1, $2, $3) RETURNING id`,
        [cat.title, cat.subtitle, ci],
      );
      const categoryId = rows[0].id;
      for (const [fi, feat] of cat.features.entries()) {
        await client.query(
          `INSERT INTO features (category_id, heading, description, image_url, display_order)
           VALUES ($1, $2, $3, $4, $5)`,
          [categoryId, feat.heading, feat.description, IMG, fi],
        );
      }
    }

    await client.query(
      `INSERT INTO company_info (email, phone, address, twitter_url, website_url)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        companyInfo.email,
        companyInfo.phone,
        companyInfo.address,
        companyInfo.twitter_url,
        companyInfo.website_url,
      ],
    );

    await client.query("COMMIT");
    console.log("✅ Database seeded successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
