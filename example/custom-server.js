const express = require('express');
const { createRequestHandler } = require('@remix-run/express');
const { createRemixViteDevServer, getRemixViteBuild } = require('../lib');

const app = express();

// Create a remix-vite dev server.
createRemixViteDevServer().then(remixViteDevServer => {
  // Use remix-vite dev server as middleware.
  app.use(remixViteDevServer.middlewares);

  app.all('*', async (req, res, next) => {
    // Get the remix build generated by remix-vite.
    const remixBuild = await getRemixViteBuild(remixViteDevServer);
  
    // Create a remix express request handler.
    const requestHandler = createRequestHandler({ build: remixBuild });
  
    await requestHandler(req, res, next);
  });

  // Start the server.
  app.listen(3000, () => {
    console.log('Listening at http://localhost:3000');
  });
});
