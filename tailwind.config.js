/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./static/templates/**/*.html",
    "./modules/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'default-color': '#012533',
        'window-background': '#ffffff',
        'active-tab-background': '#78a0d1',
        'active-tab-color': '#ffffff',
        'skill-heading-color': '#78a0d1',
        'skill-default-color': '#f1f1f3',
        'skill-default-border': '#a5a4a8',
        'skill-blue-color': '#e4ecf7',
        'skill-blue-border': '#a9b6c5',
        'description-background': '#e4ecf7',
        'description-border': '#a9b6c5',
      },
      backgroundImage: {
        'sheet-tabs-gradient': 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(179,197,227,1) 100%)',
        'personal-info-gradient': 'linear-gradient(90deg, rgba(187,199,221,1) 0%, rgba(255,255,255,1) 100%)',
        'default-heading-gradient': 'linear-gradient(90deg, rgba(3,19,24,1) 0%, rgba(0,83,125,1) 100%)',
        'karma-heading-gradient': 'linear-gradient(90deg, rgba(86,36,133,1) 0%, rgba(101,73,150,1) 100%)',
        'karma-input-gradient': 'linear-gradient(90deg, rgba(197,191,220,1) 0%, rgba(255,255,255,1) 100%)',
        'endurance-heading-gradient': 'linear-gradient(90deg, rgba(226,73,15,1) 0%, rgba(244,163,0,1) 100%)',
        'endurance-input-gradient': 'linear-gradient(90deg, rgba(240,205,198,1) 0%, rgba(255,255,255,1) 100%)',
        'skills-gradient': 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(179,197,227,1) 100%)',
        'background-description-gradient': 'linear-gradient(90deg, #142136 0%, #457fc1 100%)',
      }
    },
  },
  plugins: [],
}
