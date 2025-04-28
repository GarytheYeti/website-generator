-- Migration number: 0001 	 2025-01-16T13:42:41.031Z
DROP TABLE IF EXISTS counters;
DROP TABLE IF EXISTS access_logs;
DROP TABLE IF EXISTS themes;
DROP TABLE IF EXISTS layouts;
DROP TABLE IF EXISTS components;
DROP TABLE IF EXISTS websites;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_roles;

-- Basic system tables
CREATE TABLE IF NOT EXISTS counters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS access_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  path TEXT,
  accessed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User management tables
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  role TEXT NOT NULL, -- 'admin', 'client'
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Theme and layout system tables
CREATE TABLE IF NOT EXISTS themes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  css_variables TEXT NOT NULL, -- JSON string of CSS variables
  created_by INTEGER,
  is_public BOOLEAN DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS layouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  html_structure TEXT NOT NULL, -- JSON string of layout structure
  css_classes TEXT NOT NULL, -- JSON string of CSS classes
  compatible_themes TEXT, -- JSON array of theme IDs
  created_by INTEGER,
  is_public BOOLEAN DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS components (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  component_type TEXT NOT NULL, -- 'header', 'footer', 'hero', 'gallery', etc.
  html_structure TEXT NOT NULL, -- JSON string of component structure
  css_classes TEXT NOT NULL, -- JSON string of CSS classes
  props_schema TEXT, -- JSON schema for component properties
  created_by INTEGER,
  is_public BOOLEAN DEFAULT true,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Website and page tables
CREATE TABLE IF NOT EXISTS websites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  domain TEXT,
  theme_id INTEGER,
  owner_id INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE SET NULL,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  website_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  layout_id INTEGER,
  content TEXT NOT NULL, -- JSON string of page content
  meta_description TEXT,
  is_homepage BOOLEAN DEFAULT false,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE,
  FOREIGN KEY (layout_id) REFERENCES layouts(id) ON DELETE SET NULL,
  UNIQUE(website_id, slug)
);

-- Initial data
INSERT INTO counters (name, value) VALUES 
  ('page_views', 0),
  ('api_calls', 0);

-- Create indexes
CREATE INDEX idx_access_logs_accessed_at ON access_logs(accessed_at);
CREATE INDEX idx_counters_name ON counters(name);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_themes_is_public ON themes(is_public);
CREATE INDEX idx_layouts_is_public ON layouts(is_public);
CREATE INDEX idx_components_is_public ON components(is_public);
CREATE INDEX idx_websites_owner_id ON websites(owner_id);
CREATE INDEX idx_pages_website_id ON pages(website_id);
CREATE INDEX idx_pages_slug ON pages(slug);
