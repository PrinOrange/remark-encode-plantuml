import type * as mdast from 'mdast';
import PlantUmlCoder from 'plantuml-coder';
import type * as unified from 'unified';
import {visit} from 'unist-util-visit';

interface PlantUMLOptions {
  url?: string;
  format?: 'png' | 'svg';
  darkMode?: boolean;
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

          parent.children[index] = {
            type: 'paragraph',
            children: [
              {
                type: 'image',
                url: fullUrl.href,
              },
            ],
          } as mdast.Paragraph;
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
