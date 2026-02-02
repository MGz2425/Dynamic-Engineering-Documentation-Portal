
-- Nexus Documentation Portal - System Schema v1.0.0
-- Optimized for read-heavy workloads with full-text search indexing.

CREATE TYPE doc_category AS ENUM (
  'Protocol Specifications', 
  'Testing Procedures', 
  'System Architecture', 
  'Operations & Maintenance', 
  'Security Compliance'
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category doc_category NOT NULL,
  content TEXT NOT NULL,
  version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
  author_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', title || ' ' || content)
  ) STORED
);

CREATE INDEX idx_docs_search ON documents USING GIN(search_vector);
CREATE INDEX idx_docs_category ON documents(category);

CREATE TABLE doc_tags (
  doc_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  tag_name VARCHAR(64) NOT NULL,
  PRIMARY KEY (doc_id, tag_name)
);

CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  doc_id UUID REFERENCES documents(id),
  user_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL,
  changes JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_docs_modtime
BEFORE UPDATE ON documents
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
