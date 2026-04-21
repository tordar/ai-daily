import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

const fontBold = fs.readFileSync(
  path.resolve("node_modules/@fontsource/geist-sans/files/geist-sans-latin-800-normal.woff")
);

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "512px",
        height: "512px",
        backgroundColor: "#0a0a0a",
        borderRadius: "96px",
      },
      children: [
        {
          type: "span",
          props: {
            style: {
              color: "#00ff88",
              fontSize: "260px",
              fontWeight: 800,
              letterSpacing: "-14px",
              lineHeight: 1,
              fontFamily: "Geist Sans",
            },
            children: "AI",
          },
        },
      ],
    },
  },
  {
    width: 512,
    height: 512,
    fonts: [{ name: "Geist Sans", data: fontBold, weight: 800, style: "normal" }],
  }
);

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 512 } });
const pngBuffer = Buffer.from(resvg.render().asPng());
fs.writeFileSync(path.resolve("public/logo.png"), pngBuffer);
console.log(`Wrote public/logo.png (${pngBuffer.length} bytes, 512x512)`);
