export function HomePage() {
  return (
    <div className="home">
      <h1>Clinical Laboratory Information System</h1>
      <p>
        End-to-end laboratory workflows: accessioning, testing, instruments,
        results validation, quality control, reporting, and analytics.
      </p>
      <ul className="home__domains">
        <li>Samples & accessioning</li>
        <li>Test catalog & panels</li>
        <li>Equipment & calibration</li>
        <li>Results & critical values</li>
        <li>Doctors & hospitals</li>
        <li>Quality control</li>
        <li>Reports & analytics</li>
      </ul>
    </div>
  );
}
