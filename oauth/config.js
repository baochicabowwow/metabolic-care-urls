// Supabase project the consent page talks to. Both values are PUBLIC: the anon
// (publishable) key ships inside the app too, and RLS protects the data.
//
// PRODUCTION: fill these in before publishing (Supabase dashboard → Project
// Settings → API). They must be the same project the Krestrel app uses.
window.KRESTREL_SUPABASE = {
  url: 'https://YOUR-PROJECT-REF.supabase.co',
  anonKey: 'YOUR-ANON-OR-PUBLISHABLE-KEY',
};

// Local testing (`supabase start` + serving this repo on http://127.0.0.1:3000):
// the CLI's well-known local defaults, used automatically on localhost.
if (location.hostname === '127.0.0.1' || location.hostname === 'localhost') {
  window.KRESTREL_SUPABASE = {
    url: 'http://127.0.0.1:54321',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  };
}
