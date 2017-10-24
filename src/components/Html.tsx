import * as React from "react";

interface IHtmlProps {
  markup: string;
  manifest?: any;
}

class Html extends React.Component<IHtmlProps, {}> {
  public render(): JSX.Element {
    const { markup } = this.props;

    const scripts = this.resolve(["vendor.js", "app.js"]);
    const renderScripts = scripts.map((src, i) => <script src={src} key={i} />);

    return (
      <html>
        <head />
        <body>
          <div id="mount" dangerouslySetInnerHTML={{ __html: markup }} />
          {renderScripts}
        </body>
      </html>
    );
  }

  private resolve(files: string[]) {
    return files
      .map(src => {
        if (!this.props.manifest[src]) {
          return;
        }
        return "/public/" + this.props.manifest[src];
      })
      .filter(file => file !== undefined);
  }
}

export default Html;
