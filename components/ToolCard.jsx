export default function ToolCard({ tool }) {
  return (
    <div className="tool-card">
      <div className="tool-top">
        <div className="tool-icon" aria-hidden="true" />
        <div>
          <h4>{tool.name}</h4>
          <span className="tool-tag">{tool.category}</span>
        </div>
      </div>
      <p>{tool.description}</p>
      <div className="tool-bottom">
        <span className="tool-price">{tool.pricing}</span>
        <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer nofollow">
          Site oficial &rarr;
        </a>
      </div>
    </div>
  );
}
