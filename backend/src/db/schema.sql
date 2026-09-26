-- Zentrapay website database schema
-- Tables map 1:1 to the content blocks rendered on each frontend page.

-- ===================== Home page =====================

<<<<<<< HEAD
-- "Why People Love ZentraPay?" highlights
CREATE TYPE highlight_type AS ENUM ('security', 'transactions', 'cross_border', 'speed', 'others');

CREATE TABLE IF NOT EXISTS highlights (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    type highlight_type DEFAULT 'others',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- "Use Your Android or iOS Device to Manage Zentrapay" checklist
CREATE TYPE app_highlight_type AS ENUM ('security', 'ai', 'payment', 'others');

CREATE TABLE IF NOT EXISTS app_highlights (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    type app_highlight_type DEFAULT 'others',
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
=======
-- "Why People Love ZentraPay?" three-up feature grid
CREATE TABLE IF NOT EXISTS home_highlights (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'smartphone', -- 'smartphone' | 'security' | 'speed'
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- "Use Your Android or iOS Device to Manage Zentrapay" checklist
CREATE TABLE IF NOT EXISTS device_features (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
);

-- Rotating testimonial carousel (Home + reused as social proof)
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  profession VARCHAR(150),
  profile_image_url TEXT,
  message TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ===================== About page =====================

CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  position VARCHAR(150) NOT NULL,
  profile_image_url TEXT,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  heading VARCHAR(200) NOT NULL,
  achievement_date DATE NOT NULL,
  image_url TEXT,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS collaborations (
  id SERIAL PRIMARY KEY,
  heading VARCHAR(200) NOT NULL,
  image_url TEXT,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- ===================== Blog page =====================

CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subtitle TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  heading VARCHAR(250) NOT NULL,
  image_url TEXT,
  post_date DATE NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);

-- ===================== Features page =====================

<<<<<<< HEAD
GENERATE SEQUENCE IF NOT EXISTS feature_display_order_seq;

CREATE TABLE IF NOT EXISTS features (
  id INT GENERATED ALWAYS IDENTITY PRIMARY KEY,
  title varchar(50) NOT NULL,
=======
CREATE TABLE IF NOT EXISTS feature_categories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subtitle TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES feature_categories(id) ON DELETE CASCADE,
  heading VARCHAR(250) NOT NULL,
>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
  description TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

<<<<<<< HEAD
=======
CREATE INDEX IF NOT EXISTS idx_features_category_id ON features(category_id);

>>>>>>> 4b6e5b825f6b4f5114de5740c8a8ba68a741b8e6
-- ===================== Contact Us page =====================

-- Single-row table with the company's published contact details / socials
CREATE TABLE IF NOT EXISTS company_info (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200),
  phone VARCHAR(50),
  address TEXT,
  twitter_url TEXT,
  website_url TEXT
);

-- Submissions from the "Contact Us" form
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL,
  subject VARCHAR(250) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
