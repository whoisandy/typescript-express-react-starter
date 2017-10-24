import * as Chalk from "chalk";
import * as express from "express";
import * as logger from "morgan";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import App from "../components/App";
import Html from "../components/Html";

const manifest: any = require("../../build/manifest.json");
const HOST: string = process.env.HOST || "localhost";
const PORT: number = parseInt(process.env.PORT || "3000", 10);
const NODE_ENV: string = process.env.NODE_ENV || "development";
const isDev: boolean = NODE_ENV === "development";

function renderMarkup(markup: string): string {
  const html = ReactDOMServer.renderToString(
    <Html markup={markup} manifest={manifest} />
  );

  return `<!doctype html> ${html}`;
}

function SSRMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const markup = renderMarkup(ReactDOMServer.renderToString(<App />));
  res.status(200).send(markup);
}

class ServerManager {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.registerMiddleware();
  }

  public registerMiddleware() {
    //
    if (isDev) {
      const webpack = require("webpack");
      const webpackConfig = require("../../webpack/dev");
      const compiler = webpack(webpackConfig);

      const webpackDev = require("webpack-dev-middleware");
      const webpackHot = require("webpack-hot-middleware");

      this.server.use(
        webpackDev(compiler, {
          noInfo: true,
          publicPath: webpackConfig.output.publicPath
        })
      );

      this.server.use(webpackHot(compiler));

      this.server.use(logger("dev"));
    }

    if (!isDev) {
      this.server.use(logger("combined"));
    }

    this.server.use(SSRMiddleware);
  }

  public start(): void {
    this.server.listen(PORT, HOST, (err: express.ErrorRequestHandler) => {
      if (err) {
        throw err;
      }
      console.log(
        Chalk.default.green.underline(
          `\n\n 🌏 Server running in ${NODE_ENV} mode at http://${HOST}:${PORT}`
        )
      );
    });
  }
}

export default ServerManager;
