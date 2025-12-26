import sanitizeHtml from 'sanitize-html';

export function sanitizeContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'figure',
      'figcaption',
      'iframe',
      'details',
      'summary',
    ]),

    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'name', 'target', 'rel', 'class', 'id'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'class'],
      div: ['class', 'id', 'data-*'],
      span: ['class', 'id'],
      p: ['class', 'id'],
      h1: ['class', 'id'],
      h2: ['class', 'id'],
      h3: ['class', 'id'],
      h4: ['class', 'id'],
      h5: ['class', 'id'],
      h6: ['class', 'id'],
      figure: ['class'],
      figcaption: ['class'],
      blockquote: ['class', 'cite'],
      pre: ['class'],
      code: ['class'],
      table: ['class'],
      thead: ['class'],
      tbody: ['class'],
      tr: ['class'],
      td: ['class', 'colspan', 'rowspan'],
      th: ['class', 'colspan', 'rowspan', 'scope'],
      ul: ['class'],
      ol: ['class', 'start', 'type'],
      li: ['class'],
      strong: ['class'],
      em: ['class'],
      b: ['class'],
      i: ['class'],
      details: ['class', 'open'],
      summary: ['class'],
    },

    allowedSchemes: ['http', 'https', 'mailto'],

    /**
     * 🚫 KLJUČNI DIO – uklanja Yoast FAQ HTML IZ DOM-a
     * (ali FAQ ostaje dostupan za parsing i schema)
     */
    exclusiveFilter: (frame) => {
      const cls = frame.attribs?.class || '';

      return (
        cls.includes('schema-faq-block') ||
        cls.includes('schema-faq-section') ||
        cls.includes('wp-block-yoast-faq-block')
      );
    },

    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || '';
        const isExternal =
          href.startsWith('http') &&
          !href.includes('go2njemacka.de') &&
          !href.includes('tutorijali.org');

        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            rel: isExternal ? 'nofollow noopener noreferrer' : attribs.rel || '',
            target: isExternal ? '_blank' : attribs.target || '',
          },
        };
      },
    },
  });
}
