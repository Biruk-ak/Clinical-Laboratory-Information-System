import { useParams } from 'react-router-dom';

export function ModulePage() {
  const { moduleId } = useParams();
  return (
    <div className="module-page">
      <h1>{moduleId}</h1>
      <p>
        Operational workspace for the <strong>{moduleId}</strong> domain.
        Generated panels and API clients are available under <code>src/components</code> and <code>src/api</code>.
      </p>
    </div>
  );
}
