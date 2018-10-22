import Package from '../package.json';
const windowGlobal = typeof window !== 'undefined' && window;
const hostname = windowGlobal && windowGlobal.location && windowGlobal.location.hostname;
let backendHost;

if (/rhythmicexcellence\.london/.test(hostname)) {
  backendHost = 'https://sb59j69cub.execute-api.us-east-1.amazonaws.com/production';
} else if (/rhythmic-excellence-staging\.netlify\.com/.test(hostname)) {
  backendHost = 'https://sb59j69cub.execute-api.us-east-1.amazonaws.com/dev';
} else {
  backendHost = process.env.BACKEND_HOST || 'http://localhost:3000';
}

export const API_ROOT = `${backendHost}`;
export const VERSION = `${Package.version}`;
