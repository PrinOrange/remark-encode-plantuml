import type * as mdast from 'mdast';
import PlantUmlCoder from 'plantuml-coder';
import type * as unified from 'unified';
import {visit} from 'unist-util-visit';

interface PlantUMLOptions {
  url?: string;
  format?: 'png' | 'svg';
  darkMode?: boolean;
}

function isStringOver80KB(str: string) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  return bytes.length > 80 * 1024;
}

const remarkReferPlantUml: unified.Plugin<[PlantUMLOptions], mdast.Root> = function (opts) {
  const options: PlantUMLOptions = {
    format: 'png',
    url: 'https://www.plantuml.com/plantuml',
    darkMode: false,
    ...opts,
  };

  return function transformer(tree) {
    visit(tree, 'code', (node, index, parent) => {
      if (node.type === 'code' && node.lang?.toLowerCase() === 'plantuml' && parent && index) {
        try {
          const format = `${options.darkMode ? 'd' : ''}${options.format}`;
          const encoded = PlantUmlCoder.encode(node.value);
          const url = options.url;
          const fullUrl = new URL(`${url}/${format}/${encoded}`, url);

          if (isStringOver80KB(fullUrl.href)) {
            console.warn(
              `The encoded PlantUML URL exceeds 80KB and may trigger errors due to browser URL length limits: ${node.value.substring(0, 200)} ...`,
            );
          }

          parent.children[index] = {
            type: 'paragraph',
            children: [
              {
                type: 'image',
                url: fullUrl.href,
              },
            ],
          };
        } catch (error: any) {
          parent.children[index] = {
            type: 'code',
            lang: 'plaintext',
            value: `Error rendering PlantUML: ${error.message}`,
          };
        }
      }
    });
  };
};

export default remarkReferPlantUml;
