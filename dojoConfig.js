var locationPath = location.pathname.replace(/\/[^\/]+$/, '');
window.dojoConfig = {
  deps: ['app/main'],
  packages: [{
    name: 'react',
    location: locationPath + 'node_modules/react/dist',
    main: 'react'
  }, {
    name: 'react-dom',
    location: locationPath + 'node_modules/react-dom/dist',
    main: 'react-dom'
  }, {
    name: 'app',
    location: locationPath + 'app',
    main: 'main'
  }]
};