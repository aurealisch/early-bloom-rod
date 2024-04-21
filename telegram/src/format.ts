export default function format(text: string): [string, object] {
  return [text, { parse_mode: 'MarkdownV2' }];
}
