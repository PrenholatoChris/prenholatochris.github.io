import './SpotlightCardProject.css';

function SpotlightCardProject({ badgeText, title, description, tags, link, linkText = "View Source Code" }) {
  return (
    <div className="spotlight-card">
      {badgeText && <div className="spotlight-badge">{badgeText}</div>}
      <h2>{title}</h2>
      <p className="spotlight-desc">{description}</p>
      {tags && tags.length > 0 && (
        <div className="spotlight-tags">
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      )}
      {link && (
        <div className="spotlight-footer">
          <a href={link} target="_blank" rel="noopener noreferrer" className="spotlight-link">
            {linkText}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ verticalAlign: 'middle', marginLeft: '4px' }}>
              <path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3zm-2 2H5v14h14v-7h2v9H3V3h9v2z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

export default SpotlightCardProject;
