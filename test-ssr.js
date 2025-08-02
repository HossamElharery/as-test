// Test script to verify SSR is working
const { exec } = require('child_process');
const http = require('http');

console.log('Testing SSR functionality...\n');

// Function to fetch and analyze HTML
function checkSSR(port) {
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/',
    method: 'GET',
    headers: {
      'User-Agent': 'SSR-Test-Bot'
    }
  };

  const req = http.request(options, (res) => {
    let html = '';

    res.on('data', (chunk) => {
      html += chunk;
    });

    res.on('end', () => {
      console.log('\n=== SSR ANALYSIS ===');
      console.log('Response Status:', res.statusCode);
      console.log('HTML Length:', html.length);

      // Check for meta tags
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const descMatch = html.match(/<meta name="description" content="(.*?)"/);
      const keywordsMatch = html.match(/<meta name="keywords" content="(.*?)"/);

      console.log('\n=== META TAGS FOUND ===');
      console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
      console.log('Description:', descMatch ? descMatch[1].substring(0, 50) + '...' : 'NOT FOUND');
      console.log('Keywords:', keywordsMatch ? keywordsMatch[1].substring(0, 50) + '...' : 'NOT FOUND');

      // Check for SSR markers
      const hasTransferState = html.includes('script id="ng-state"');
      const hasNgVersion = html.includes('ng-version');

      console.log('\n=== SSR MARKERS ===');
      console.log('Has TransferState:', hasTransferState);
      console.log('Has ng-version:', hasNgVersion);

      // Look for our debug logs in the HTML comments
      const ssrLogs = html.match(/<!--\[SSR-.*?-->/g);
      if (ssrLogs) {
        console.log('\n=== SSR DEBUG LOGS ===');
        ssrLogs.forEach(log => console.log(log));
      }

      console.log('\n=== CONCLUSION ===');
      if (titleMatch && titleMatch[1] !== 'Alaaddin' && descMatch && descMatch[1]) {
        console.log('✅ SSR is working - Meta tags are being set');
      } else {
        console.log('❌ SSR is NOT setting meta tags properly');
        console.log('   - Title is:', titleMatch ? titleMatch[1] : 'empty');
        console.log('   - Description is:', descMatch ? 'present but may be empty' : 'missing');
      }
    });
  });

  req.on('error', (e) => {
    console.error('Error connecting to SSR server:', e.message);
    console.log('\nMake sure the SSR server is running with:');
    console.log('npm run serve:ssr');
  });

  req.end();
}

// Check if port is provided
const port = process.argv[2] || 4000;
console.log(`Checking SSR on port ${port}...`);
checkSSR(port);
