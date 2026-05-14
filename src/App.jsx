import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css"

const GALLERY_DB = [
  {
    id: 1, title: "Neural Dashboard", category: "AI",
    image_url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    description: "Real-time AI analytics dashboard with predictive modelling and live neural network visualizations.",
    created_at: "2025-01-12",
  },
  {
    id: 2, title: "Commerce Platform", category: "Web",
    image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    description: "Full-stack e-commerce solution with cart, payments, and admin panel built with React and Node.",
    created_at: "2025-02-08",
  },
  {
    id: 3, title: "Fitness Tracker App", category: "Mobile",
    image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    description: "Cross-platform mobile health app with workout logging, GPS routes, and progress charts.",
    created_at: "2025-01-25",
  },
  {
    id: 4, title: "Data Scraper Suite", category: "Python",
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    description: "Automated web scraping framework using Scrapy, Selenium, and async pipelines with MongoDB storage.",
    created_at: "2025-03-01",
  },
  {
    id: 5, title: "Portfolio OS", category: "Web",
    image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    description: "OS-inspired portfolio website with animated desktop, draggable windows, and terminal emulator.",
    created_at: "2025-02-14",
  },
  {
    id: 6, title: "Vision Classifier", category: "AI",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    description: "Computer vision model trained on 50k images for real-time object detection with 96.4% accuracy.",
    created_at: "2025-01-30",
  },
  {
    id: 7, title: "Chat Messenger", category: "Mobile",
    image_url: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    description: "End-to-end encrypted messaging app with voice notes, group chats, and media sharing for iOS & Android.",
    created_at: "2025-03-10",
  },
  {
    id: 8, title: "API Automation Bot", category: "Python",
    image_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    description: "Intelligent automation bot integrating 20+ REST APIs with natural language command processing.",
    created_at: "2025-02-28",
  },
  {
    id: 9, title: "Brand Studio", category: "Web",
    image_url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    description: "Online brand identity builder with AI-powered logo generation, color palettes, and typography pairing.",
    created_at: "2025-03-15",
  },
  {
    id: 10, title: "Language Model UI", category: "AI",
    image_url: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=800&q=80",
    description: "Clean front-end for local LLM inference with streaming tokens, context windows, and prompt templates.",
    created_at: "2025-03-20",
  },
  {
    id: 11, title: "AR Navigation", category: "Mobile",
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    description: "Augmented reality indoor navigation for airports and malls using ARKit and custom SLAM algorithms.",
    created_at: "2025-02-20",
  },
  {
    id: 12, title: "Financial Analyzer", category: "Python",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    description: "Quantitative finance toolkit with backtesting, portfolio optimization, and live market data streaming.",
    created_at: "2025-03-05",
  },
];

const api = {
  async getGallery(category = "All", search = "") {
    await new Promise(r => setTimeout(r, 600));
    let items = [...GALLERY_DB];
    if (category !== "All") items = items.filter(i => i.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
      );
    }
    return items;
  }
};

const CATEGORIES = ["All", "Web", "AI", "Mobile", "Python"];
const CAT_COLORS = {
  All: "#6366f1", Web: "#0ea5e9", AI: "#8b5cf6", Mobile: "#f59e0b", Python: "#10b981"
};

function getCatStyle(cat) {
  const color = CAT_COLORS[cat] || "#6366f1";
  return {
    backgroundColor: color + "1a",
    color: color,
    border: `1px solid ${color}33`,
  };
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function SkeletonCard() {
  return (
    <div className="skeleton">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line" style={{ width: "60%" }} />
        <div className="skeleton-line" style={{ width: "90%" }} />
        <div className="skeleton-line" style={{ width: "75%" }} />
      </div>
    </div>
  );
}

function GalleryCard({ item, onClick, style }) {
  // const catColor = CAT_COLORS[item.category] || "#6366f1";
  return (
    <div className="card" onClick={() => onClick(item)} style={style}>
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={item.image_url}
          alt={item.title}
          loading="lazy"
        />
        <div className="card-overlay">
          <span className="overlay-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            View project
          </span>
        </div>
        <span className="card-cat" style={getCatStyle(item.category)}>
          {item.category}
        </span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.description}</p>
        <div className="card-meta">
          <span className="card-date">{formatDate(item.created_at)}</span>
          <span className="card-arrow">→</span>
        </div>
      </div>
    </div>
  );
}

function Modal({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  // const catColor = CAT_COLORS[item.category] || "#6366f1";

  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-img-wrap">
          <img className="modal-img" src={item.image_url} alt={item.title} />
          <div className="modal-img-gradient" />
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          {hasPrev && (
            <button className="modal-nav prev" onClick={onPrev} aria-label="Previous">←</button>
          )}
          {hasNext && (
            <button className="modal-nav next" onClick={onNext} aria-label="Next">→</button>
          )}
        </div>
        <div className="modal-body">
          <span className="modal-cat-tag" style={{ ...getCatStyle(item.category), borderRadius: "8px" }}>
            {item.category}
          </span>
          <h2 className="modal-title">{item.title}</h2>
          <p className="modal-desc">{item.description}</p>
          <div className="modal-footer">
            <span className="modal-date">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(item.created_at)}
            </span>
            <span className="modal-id">ID #{String(item.id).padStart(4, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DynamicGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [modalIdx, setModalIdx] = useState(null);
  const searchRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getGallery(category, search);
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const t = setTimeout(fetchData, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchData, search]);

  const openModal = useCallback((item) => {
    const idx = items.findIndex(i => i.id === item.id);
    setModal(item);
    setModalIdx(idx);
  }, [items]);

  const closeModal = useCallback(() => {
    setModal(null);
    setModalIdx(null);
  }, []);

  const prevModal = useCallback(() => {
    if (modalIdx > 0) {
      setModal(items[modalIdx - 1]);
      setModalIdx(modalIdx - 1);
    }
  }, [items, modalIdx]);

  const nextModal = useCallback(() => {
    if (modalIdx < items.length - 1) {
      setModal(items[modalIdx + 1]);
      setModalIdx(modalIdx + 1);
    }
  }, [items, modalIdx]);

  return (
    <>

      <header className="hero">
        <div className="hero-eyebrow">Portfolio Gallery</div>
        <h1>Creative<br />Projects</h1>
        <p>A curated showcase of work across web, AI, mobile & Python — loaded dynamically from a JSON API.</p>
      </header>

      <div className="controls">
        <div className="cat-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn${category === cat ? " active" : ""}`}
              style={{ "--cc": CAT_COLORS[cat] }}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchRef}
            className="search-input"
            type="text"
            placeholder="Search projects…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="status-bar">
        {!loading && (
          <span className="status-count">
            <strong>{items.length}</strong> {items.length === 1 ? "project" : "projects"} found
          </span>
        )}
      </div>

      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="gallery">
          {items.length === 0 ? (
            <div className="empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3>No projects found</h3>
              <p>Try a different category or search term.</p>
            </div>
          ) : (
            items.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={openModal}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))
          )}
        </div>
      )}

      {modal && (
        <Modal
          item={modal}
          onClose={closeModal}
          onPrev={prevModal}
          onNext={nextModal}
          hasPrev={modalIdx > 0}
          hasNext={modalIdx < items.length - 1}
        />
      )}
    </>
  );
}