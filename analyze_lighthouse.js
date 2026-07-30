const fs = require('fs');
const path = require('path');

const files = [
  'pustatelier -lighthouse-desktop-20260730T053220.json',
  'pustatelier -lighthouse-mobile-20260730T053410.json'
];

files.forEach(file => {
  const filePath = path.join(__dirname, 'optimization', file);
  if (fs.existsSync(filePath)) {
    console.log(`\n--- Analysis for ${file} ---`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log(`Performance Score: ${data.categories.performance.score * 100}`);
    console.log('Metrics:');
    ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].forEach(metric => {
      const audit = data.audits[metric];
      if (audit) {
        console.log(`  ${audit.title}: ${audit.displayValue}`);
      }
    });

    console.log('\nTop Opportunities:');
    const opportunities = Object.values(data.audits)
      .filter(audit => audit.details && audit.details.type === 'opportunity' && audit.details.overallSavingsMs > 0)
      .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
      .slice(0, 5);
      
    opportunities.forEach(opp => {
      console.log(`  ${opp.title}: Savings ${opp.details.overallSavingsMs.toFixed(0)} ms`);
    });
    
    console.log('\nTop Diagnostics:');
    const diagnostics = Object.values(data.audits)
      .filter(audit => audit.score !== null && audit.score < 1 && audit.details && audit.details.type !== 'opportunity')
      .sort((a, b) => a.score - b.score)
      .slice(0, 5);
      
    diagnostics.forEach(diag => {
      console.log(`  ${diag.title} (Score: ${diag.score})`);
    });
  }
});
