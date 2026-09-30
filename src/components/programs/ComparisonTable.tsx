import { CASH_PROGRAM, AGENT_PROGRAM, PROGRAM_COMPARISON } from '../../data/programs';
import './ComparisonTable.css';

export function ComparisonTable() {
  return (
    <table className="compare-table">
      <caption className="visually-hidden">Cash Program compared with the Real Estate Agent Program</caption>
      <thead>
        <tr>
          <td />
          <th scope="col">{CASH_PROGRAM.name}</th>
          <th scope="col">{AGENT_PROGRAM.name}</th>
        </tr>
      </thead>
      <tbody>
        {PROGRAM_COMPARISON.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td data-label={CASH_PROGRAM.name}>{row.cash}</td>
            <td data-label={AGENT_PROGRAM.name}>{row.agent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
