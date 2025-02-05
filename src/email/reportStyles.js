export const reportStyles = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #020f15;
    margin: 0;
    padding: 40px;
    line-height: 1.6;
    background-color: #f8f9fa;
  }
  
  p {
    color: #020f15;
    font-size: 1rem;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    border-radius: 16px;
    padding: 0 32px 32px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .banner {
    width: 100%;
    height: 200px;
    background-image: url('https://img.mailinblue.com/7320020/images/content_library/original/66d0ea0fc3a931007aa9d8f1.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0 auto 12px;
    border-radius: 12px;
  }


  .title {
    color: #343a40;
    font-size: 1.5rem;
    margin-bottom: 8px;
    text-align: center;
    border-bottom: none;
  }

  .greeting {
    font-size: 1rem;
    color: #495057;
    margin-bottom: 24px;
    text-align: center;
  }

  .hours-card {
    background-color: #e9ecef;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    text-align: center;
  }

  .hours-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #343a40;
    margin: 16px 0;
  }

  .period-box {
    background-color: #343a40;
    color: white;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
    font-size: 0.9rem;
  }

  .emoji {
    font-size: 2rem;
    margin-bottom: 16px;
    display: block;
    text-align: center;
  }

  .brand {
    text-align: center;
    margin-bottom: 24px;
  }

  .brand-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #020f15;
    letter-spacing: 1px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 16px;
  }

  .stat-item {
    background: white;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
  }

  .stat-label {
    display: block;
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #343a40;
  }

  .footer {
    text-align: center;
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid #dee2e6;
    color: #6c757d;
    font-size: 0.9rem;
  }

  .footer-cta {
    color: #2bcf75;
    font-weight: bold;
  }

  .report-container {
    max-width: 900px;
    margin: 0 auto;
    background-color: white;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .report-title {
    color: #343a40;
    font-size: 1.75rem;
    margin-bottom: 8px;
    text-align: center;
  }

  .report-subtitle {
    color: #6c757d;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 32px;
  }

  .table-container {
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #e9ecef !important;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin: 0;
    background: transparent;
  }

  .table__head {
    background-color: #343a40;
  }

  .table__head th {
    color: #fff;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 16px;
    text-align: center;
  }


  .table__row:last-child {
    border-bottom: none;
  }

  .table__row td {
    padding: 16px;
    font-size: 0.9rem;
    color: #495057;
    text-align: center;
    border-bottom: 1px solid #e9ecef;
  }

  .table__head th {
    color: #fff;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 16px;
    text-align: center;
  }

  .table__row:hover {
    background-color: #f8f9fa;
  }

  .table__row:last-child {
    border-bottom: none;
  }

  .table__row td {
    padding: 16px;
    font-size: 0.9rem;
    color: #495057;
    text-align: left;
  }

  .table__row td.center {
    text-align: center;
  }

  .powered-by {
    display: inline-block;
    background-color: #2bcf75;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-top: 16px;
    text-decoration: none;
    color: white !important;
  }

  .amount {
    font-family: monospace;
    font-weight: 500;
  }

  .hours {
    font-weight: 500;
    color: #343a40;
  }

  .report-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .report-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .report-card__header {
    background: #343a40;
    color: white;
    padding: 20px;
  }

  .report-card__company {
    margin: 0 0 4px 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .report-card__talent {
    font-size: 0.9rem;
    opacity: 0.9;
    display: block;
  }

  .report-card__body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .report-card__hours {
    text-align: center;
    margin-bottom: 24px;
  }

  .report-card__hours .stat-label {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 8px;
  }

  .report-card__hours .stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #343a40;
  }

  .period-dates {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin-top: auto;
  }

  .date-label {
    display: block;
    color: #6c757d;
    font-size: 0.85rem;
    margin-bottom: 4px;
    text-align: center;
  }

  .date-value {
    font-size: 0.95rem;
    color: #343a40;
    font-weight: 500;
    text-align: center;
  }

  .center {
    text-align: center;
  }

  .powered-by {
    display: inline-block;
    background-color: #2bcf75;
    color: #fff;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-top: 16px;
    text-decoration: none;
  }

  .powered-by:hover {
    background-color: #25b867;
  }
`
