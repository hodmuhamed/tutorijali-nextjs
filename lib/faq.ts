export type FaqItem = {
  question: string
  answer: string
}

function decodeBasicHtmlEntities(input: string) {
  return input
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function cleanText(input: string) {
  const noTags = input
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/div>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return decodeBasicHtmlEntities(noTags)
}

export function extractFaqFromHtml(html: string): FaqItem[] {
  if (!html || typeof html !== 'string') return []

  const faqBlockMatch = html.match(
    /<div[^>]*class="[^"]*schema-faq-block[^"]*"[^>]*>([\s\S]*?)<\/div>/i
  )

  const scope = faqBlockMatch?.[0] ?? html

  const regex =
    /<strong[^>]*class="[^"]*schema-faq-question[^"]*"[^>]*>([\s\S]*?)<\/strong>[\s\S]*?<p[^>]*class="[^"]*schema-faq-answer[^"]*"[^>]*>([\s\S]*?)<\/p>/gi

  const items: FaqItem[] = []
  let m: RegExpExecArray | null

  while ((m = regex.exec(scope)) !== null) {
    const question = cleanText(m[1] || '').replace(/^\d+\.\s*/, '')
    const answer = cleanText(m[2] || '')

    if (question.length >= 5 && answer.length >= 3) {
      items.push({ question, answer })
    }
  }

  return items.slice(0, 8)
}

export function buildFaqJsonLd(faq: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((x) => ({
      '@type': 'Question',
      name: x.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: x.answer,
      },
    })),
  }
}
