@import "styles/settings/__settings";

/* Main Title (H1) Styling - Compact & Clean */
.title {
  font-size: 2rem !important;
  font-weight: 800;
  line-height: 1.25;
  color: #111827;
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  max-width: 850px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.6rem !important;
  }
}

/* Post Metadata (Date & Categories) */
.postMetadata {
  text-align: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Main Post Layout */
.postLayout {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.mainArticle {
  flex: 1;
  min-width: 0;
}

/* Post Body Text & Headings (Fixing Font Sizes) */
.content,
:global(.content) {
  font-size: 1.05rem !important;
  line-height: 1.7 !important;
  color: #374151 !important;

  p {
    font-size: 1.05rem !important;
    line-height: 1.7 !important;
    margin-bottom: 1.25rem !important;
    color: #374151 !important;
  }

  h2 {
    font-size: 1.5rem !important;
    font-weight: 700 !important;
    margin-top: 1.75rem !important;
    margin-bottom: 0.75rem !important;
    color: #111827 !important;
  }

  h3 {
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    margin-top: 1.5rem !important;
    margin-bottom: 0.5rem !important;
    color: #111827 !important;
  }
}

/* Sidebar Settings */
.sidebar {
  width: 320px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 900px) {
    width: 100%;
    margin-top: 2rem;
  }
}

.widget {
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

/* Search Bar Styling */
.searchForm {
  display: flex;
  gap: 0.5rem;
}

.searchInput {
  flex: 1;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #2563eb;
  }
}

.searchButton {
  padding: 0.55rem 0.9rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
}

.widgetTitle {
  font-size: 1.05rem !important;
  font-weight: 700;
  margin-bottom: 0.85rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid #111827;
  color: #111827;
}

/* Related Posts List & Titles */
.widgetList {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;

  li {
    margin-bottom: 0.75rem !important;
    padding-bottom: 0.75rem !important;
    border-bottom: 1px solid #e9ecef;

    &:last-child {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
      border-bottom: none;
    }

    a {
      text-decoration: none !important;
      color: #0066cc !important;
      font-weight: 600 !important;
      font-size: 0.88rem !important;
      line-height: 1.35 !important;
      display: block;

      &:hover {
        text-decoration: underline !important;
        color: #004499 !important;
      }
    }
  }
}

.postFooter {
  text-align: center;
}

.postModified {
  color: $color-gray-500;
  font-style: italic;
  margin-bottom: 3rem;
}
